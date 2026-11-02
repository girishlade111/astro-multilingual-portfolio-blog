---
title: "Privacidade por arquitetura: processando PDFs e mídia no cliente sem servidores"
description: "Por que enviar documentos confidenciais para conversores em nuvem é um risco desnecessário, e como o LS PDF e o LS Image Compressor tratam arquivos 100% na memória do seu navegador."
pubDate: "2026-10-30"
readingTime: 6
category: "Arquitetura Web · Segurança"
slug: "privacy-first-local-file-processing-web"
lang: "pt"
---

Todos os dias, milhões de pessoas no mundo inteiro enviam extratos bancários, exames médicos, cópias de documentos de identificação, contratos de trabalho e fotos de família para sites de conversão supostamente «gratuitos». Fazem isso para resolver pendências corriqueiras: juntar dois PDFs, comprimir uma imagem para anexar em um formulário ou girar um comprovante escaneado.

A maioria acredita que, assim que o download é concluído, o documento é imediatamente apagado. Mas, sob a ótica da engenharia de software, a partir do instante em que um arquivo encosta no disco de um servidor remoto, essa garantia se torna frágil: rotinas de backup são acionadas, diretórios temporários demoram a ser limpos, logs de acesso gravam metadados e servidores na nuvem podem sofrer invasões ou erros de configuração.

Ao desenhar o **LS PDF** (`pdf.ladestack.in`) e o **LS Image Compressor** (`img.ladestack.in`) sob a bandeira do **LadeStack**, adotei um princípio arquitetural claro e inegociável: **a melhor maneira de proteger os dados de alguém é nunca receber esses arquivos em nossos servidores.**

## A mudança de mentalidade para a computação no cliente

No passado, os navegadores não tinham capacidade para interpretar estruturas binárias pesadas como arquivos PDF ou processar matrizes complexas de pixels. Por essa razão, essas tarefas precisavam obrigatoriamente ser delegadas a ferramentas instaladas no servidor, como ImageMagick, Ghostscript ou Poppler.

Hoje em dia, essa abordagem tornou-se obsoleta para operações utilitárias do dia a dia. Com motores de JavaScript otimizando arrays tipados, WebAssembly executando rotinas a velocidades próximas à linguagem de máquina e a API Canvas do HTML5 aproveitando a aceleração por hardware da placa de vídeo, o navegador consegue realizar manipulações de documentos diretamente no seu computador ou celular.

```text
[Fluxo Tradicional na Nuvem]
Arquivo -> Envio pela Internet -> Disco do Servidor -> Processamento Backend -> Download
(Lento, gasta franquia de dados, alto risco de vazamento de dados)

[Arquitetura Local do LadeStack]
Arquivo -> ArrayBuffer na RAM do Navegador -> Web Worker / Canvas -> URL Blob Local
(Sem upload, processamento instantâneo, privacidade absoluta)
```

## Os bastidores do LS PDF: 17 funções na memória local

O **LS PDF** foi construído com base em duas bibliotecas concebidas para rodar integralmente no navegador: o **PDF.js** (para renderização visual e extração de texto) e o **pdf-lib** (para modificar, mesclar, separar e gravar fluxos binários de PDF).

### 1. Mesclar e dividir sem tráfego de rede

Quando você junta três arquivos PDF no LS PDF:
1. Você seleciona os arquivos através da File API padrão do HTML5.
2. Os dados são lidos diretamente para a memória RAM como instâncias de `ArrayBuffer` usando `FileReader.readAsArrayBuffer()`.
3. O `PDFDocument.load()` interpreta a estrutura das páginas na memória da sua aba.
4. As páginas selecionadas são transferidas para um novo documento com `newDoc.copyPages(sourceDoc, indices)`.
5. O PDF final é convertido em um array `Uint8Array`, transformado em um endereço de memória local com `URL.createObjectURL(new Blob([...]))` e baixado instantaneamente.

Todo esse processo dura menos de 200 milissegundos em um computador comum. Nenhum byte sequer trafega pela internet.

### 2. Evitando congelamentos de tela com Web Workers

A interpretação de arquivos PDF pesados com dezenas de gráficos vetoriais pode sufocar a thread principal do navegador. Se ela travar por mais de 50 milissegundos, a rolagem da página fica travada e o navegador pode exibir alertas de página que não responde.

Para manter a interface perfeitamente suave a 60 quadros por segundo, o LS PDF isola todo o trabalho pesado em **Web Workers** em segundo plano:

```typescript
// Passando a posse do buffer para outra thread sem duplicar memória
const worker = new Worker('/workers/pdf-worker.js');
const buffer = await file.arrayBuffer();

worker.postMessage({ action: 'EXTRACT_TEXT', buffer }, [buffer]);
```

Ao passar o `buffer` como um Transferable Object (objeto transferível), a memória é atribuída à nova thread instantaneamente, sem precisar de cópias extras. Ao final, apenas o resultado formatado retorna à tela principal.

## Os bastidores do LS Image Compressor: uso direto da Canvas API

No **LS Image Compressor**, eliminamos qualquer dependência de servidores de imagem utilizando diretamente a **HTML5 Canvas API** acelerada pela placa gráfica do usuário.

### 1. Redimensionamento e cálculo do tamanho exato

Ao soltar uma imagem no compressor:
1. O arquivo é decodificado em um `ImageBitmap` fora da thread de renderização.
2. Calculamos as novas proporções respeitando as dimensões máximas solicitadas.
3. Desenhamos a imagem em um `OffscreenCanvas` com interpolação bicúbica de alta qualidade.
4. Exportamos o resultado otimizado chamando `.convertToBlob({ type: 'image/webp', quality })`.

Se você precisa de um peso exato (por exemplo: «comprimir essa foto de 4 MB para menos de 200 KB para um concurso público»), a ferramenta executa um algoritmo rápido de busca binária. Ela calibra o índice de qualidade entre 0,1 e 1,0 em 3 a 4 passagens rápidas até atingir com precisão a meta estipulada.

### 2. Segurança total contra vazamentos de capturas de tela

Muitas ferramentas comerciais pedem upload de imagens. Como nossa ferramenta roda localmente, você pode colar imagens diretamente da sua área de transferência (`Ctrl+V`) — como faturas ou documentos de trabalho — e comprimi-las na hora sem qualquer risco de vazamento para servidores externos.

## Sustentabilidade econômica e respeito ao usuário

Construir softwares voltados à execução no cliente traz benefícios concretos para as duas pontas:

- **Custo zero de infraestrutura para o criador**: Como todo o processamento roda na CPU de quem usa, o LadeStack não precisa arcar com faturas astronômicas de servidores na nuvem nem tráfego de rede. Isso nos permite manter todas as ferramentas gratuitas e sustentáveis por tempo indeterminado.
- **Privacidade comprovada pela prática**: Não precisamos redigir termos de uso de 40 páginas prometendo que «cuidamos bem dos seus dados». A nossa própria arquitetura torna fisicamente impossível que nós vejamos os seus arquivos.
- **Funcionamento sem conexão**: Como o código fica armazenado em cache no navegador, as ferramentas continuam funcionando perfeitamente em viagens de avião ou locais sem sinal de internet.

A privacidade não deve ser tratada como um privilégio caro vendido em planos corporativos. Ao confiar na capacidade real dos navegadores modernos, podemos criar utilitários mais rápidos, mais baratos e verdadeiramente seguros para todos.

