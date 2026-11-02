---
title: "Da engenharia mecânica ao desenvolvimento full-stack: como os sistemas físicos moldaram meu código"
description: "Como o aprendizado prático de sistemas mecânicos, tolerâncias e limites físicos na Fabtech e no SVERI moldou meu modelo mental para criar arquiteturas web escaláveis e boas interfaces."
pubDate: "2026-10-18"
readingTime: 6
category: "Trajetória · Pensamento Sistêmico"
slug: "from-mechanical-engineering-to-fullstack-dev"
lang: "pt"
---

Minha formação técnica não começou com frameworks de JavaScript nem esquemas de banco de dados. Em 2018, eu passava os dias na oficina do Fabtech Technical Campus com um paquímetro e um micrômetro nas mãos, medindo peças de aço com precisão de centésimos de milímetro. Mais tarde, nos estudos de engenharia mecânica na faculdade SVERI, em Pandharpur, minha rotina era repleta de termodinâmica, mecânica dos fluidos, resistência dos materiais e cálculos de engrenagens.

Naquela época, a engenharia mecânica e o desenvolvimento de software pareciam dois universos sem qualquer conexão. Uma lidava com massa física, calor, atrito e engrenagens de metal; a outra lidava com arquivos de texto abstratos, memória virtual e a árvore DOM do navegador.

No entanto, quando migrei para o desenvolvimento full-stack e o design de interfaces (UI/UX), percebi que a engenharia mecânica já havia me dado a habilidade mais importante para a programação: **o pensamento sistêmico sob restrições físicas reais**.

## Tolerâncias de usinagem e estados de software

Em uma oficina mecânica não existe medida perfeita. Se você precisa projetar um eixo de 25,00 mm para encaixar em um rolamento de 25,02 mm, deve definir uma tolerância milimétrica (como +0,01 mm / -0,00 mm). Se o torneiro desbastar metal além da conta, haverá folga e a peça quebrará com a vibração. Se desbastar de menos, o eixo travará com a dilatação térmica.

Quando comecei a programar no frontend com TypeScript e React, notei exatamente a mesma lógica. No software, as «tolerâncias» são suas tipagens, esquemas de validação e limites de estados:

- Quando uma API retorna `null` em vez de uma lista, sua interface mostra um estado vazio bem desenhado ou quebra a tela inteira com uma exceção não tratada?
- Quando o usuário digita um caractere incomum ou clica duas vezes em um botão em fração de segundo, seu código tolera essa vibração ou os dados se corrompem?

A mentalidade de engenheiro mecânico me impediu de escrever código apenas para o cenário ideal. No mundo real, as peças vibram, esquentam e sofrem desgaste. Na web, conexões falham, servidores demoram e usuários realizam ações imprevisíveis. Projetar pensando na falha não é excesso de zelo; é responsabilidade técnica fundamental.

## Concentração de tensões e gargalos de desempenho

Em resistência dos materiais há um princípio clássico chamado **concentração de tensões**. Se você faz um entalhe reto de 90 graus em uma barra de aço tracionada, as linhas de força se acumulam naquele vértice, multiplicando a tensão interna até surgir uma trinca por fadiga. Um engenheiro experiente sempre aplica um arredondamento suave (fillet) para distribuir o esforço ao longo do material.

A web sofre com as mesmas concentrações de tensão, e elas costumam ocorrer na thread principal do navegador:

```text
[Thread Principal] -> Processamento Pesado -> Mutação Síncrona do DOM -> Reflow Forçado -> Travamentos
```

Ao criar o **LS PDF** e o **LS Image Compressor**, processar arquivos pesados na thread principal era o equivalente a fazer um corte reto na barra de aço: o navegador congelava, cliques eram ignorados e a tela perdia fluidez.

Aplicar o conceito do arredondamento mecânico foi redistribuir esse estresse computacional:
1. Usar **Web Workers** para executar cálculos pesados fora da thread de renderização.
2. Fragmentar loops síncronos com `requestIdleCallback` ou geradores assíncronos.
3. Utilizar arrays tipados (`Uint8Array`) para aliviar o coletor de lixo ao manipular arquivos binários.

Quando você compreende que os ciclos de CPU e os milissegundos por quadro são recursos físicos finitos, otimizar uma aplicação web torna-se uma ciência exata.

## Montagens mecânicas e arquitetura de componentes

Ao projetar uma caixa de engrenagens, ninguém esculpe tudo a partir de um bloco sólido de ferro. Você projeta componentes individuais — engrenagens, eixos, chavetas, rolamentos e carcaças —, cada um com pontos de montagem e tolerâncias bem estabelecidas. Se um dente quebra, você troca a engrenagem, não a máquina inteira.

Aplico essa mesma estrutura modular no **LadeStack** e neste portfólio multilíngue em Astro:

- **Contratos bem definidos**: Um componente só deve saber o que for estritamente necessário para sua tarefa. Compartilhar estado global sem controle é o equivalente a soldar um rolamento direto no eixo.
- **Substituição sem traumas**: Uma função utilitária ou um elemento de tela deve poder ser trocado sem desestruturar os subsistemas vizinhos.
- **Manutenção acima de malabarismos**: As melhores máquinas são reparadas com ferramentas comuns. O melhor código é aquele que outro profissional consegue entender e ajustar meses depois.

## Unindo o rigor da engenharia ao design

Muitos enxergam a engenharia e o design UI/UX como lados opostos: um racional e matemático; o outro subjetivo e visual. Não concordo com essa divisão.

O bom design nada mais é do que engenharia adaptada aos sentidos e à psicologia humana. Assim como um torno mecânico exige alavancas de parada bem posicionadas, manípulos firmes e mostradores nítidos, um software precisa de hierarquia tipográfica, suporte a teclado, valores padrão conscientes e mensagens de erro diretas.

Sair das oficinas em Pandharpur para entregar produtos digitais a partir de Pune me provou que a matéria-prima muda, mas o compromisso permanece o mesmo: entender o sistema, respeitar os limites da plataforma, remover atritos e construir ferramentas em que as pessoas possam confiar plenamente.

