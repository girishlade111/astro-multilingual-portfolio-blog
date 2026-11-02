import fs from 'node:fs';
import path from 'node:path';

const LOCALES = ['en', 'jp', 'ko', 'zh', 'ru', 'pt', 'tr', 'fr', 'es'];

const articles = [
  {
    slug: 'local-notes-document-intelligence-vector-embeddings',
    pubDate: '2026-11-05',
    readingTime: 6,
    category: 'Prototypes',
    tool: 'Document Intelligence',
    tags: ['vector-search', 'embeddings', 'wasm', 'knowledge-graphs'],
    locales: {
      en: {
        title: 'Document Intelligence: Running Local Vector Search and Embeddings in the Browser',
        description: 'How we implemented in-browser semantic vector retrieval using WebAssembly, quantized transformer models, and cosine similarity with zero server dependencies.',
        content: `Personal notes, meeting transcripts, and engineering logs contain our most sensitive intellectual property. Yet most "AI note-taking" applications force users to synchronize their entire knowledge base to third-party cloud servers so an OpenAI API can compute embeddings.

In the LadeStack R&D prototypes, I explored an alternative: **can a web browser compute vector embeddings and perform semantic similarity search entirely on the client?**

The answer is yes.

## Quantized Transformers via ONNX Web

Thanks to ONNX Runtime Web and quantized sentence embedding models (such as \`all-MiniLM-L6-v2\` compressed to ~23MB in 8-bit precision), modern laptops and mobile phones can generate 384-dimensional dense vectors in under 15 milliseconds.

\`\`\`typescript
export function cosineSimilarity(vecA: Float32Array, vecB: Float32Array): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dot / denominator;
}
\`\`\`

## Fast Semantic Retrieval with Local Indices

When a user writes a new note:
1. The note text is tokenized and passed to the local WebAssembly model.
2. The resulting 384-element float array is indexed in an IndexedDB object store alongside raw text.
3. When searching, the query embedding is compared against the stored vectors in memory using dot-product SIMD vector acceleration.

A private, intelligent second brain that never leaves your device.`
      },
      jp: {
        title: 'ドキュメントインテリジェンス：ブラウザ内ベクトル検索と埋め込み技術',
        description: 'WebAssemblyと量子化モデルを用い、外部APIを介さずに端末ローカルだけでセマンティック検索を実現する手法。',
        content: `機密メモを外部AIサーバーにアップロードすることなく、ブラウザ内でローカルにベクトル埋め込み（Embeddings）を生成し、類似度検索を行う技術プロトタイプを開発しました。

軽量な量子化モデルをWebAssembly上で動かすことで、オフラインでもミリ秒単位で文脈に沿った高速検索が可能です。`
      },
      ko: {
        title: '문서 인텔리전스: 브라우저 내부 벡터 검색과 시맨틱 임베딩 구현',
        description: '클라우드 전송 없이 WebAssembly 기반 소형 모델과 코사인 유사도를 통해 브라우저에서 직접 구동하는 지능형 검색.',
        content: `개인 노트 데이터를 외부 서버로 전송하지 않고 브라우저 내부에서 직접 텍스트 벡터를 추출하고 코사인 유사도를 계산하는 로컬 검색 프로토타입을 구축했습니다.`
      },
      zh: {
        title: '文档智能：基于 WebAssembly 的浏览器端本地向量检索实践',
        description: '探索如何在不依赖远端大模型的前提下，利用量化模型与余弦相似度在前端实现私密、实时的语义知识库检索。',
        content: `为了在完全保护隐私的前提下实现笔记的语义联想，我探索了在浏览器端通过 WebAssembly 运行轻量量化模型并建立本地向量索引的方案。全流程零网络请求，毫秒级响应。`
      },
      ru: {
        title: 'Локальный векторный поиск и эмбеддинги в памяти браузера',
        description: 'Семантический поиск по заметкам с использованием WebAssembly и косинусного сходства без отправки данных на серверы.',
        content: `Прототип локального поиска вычисляет векторные представления прямо в браузере с помощью WebAssembly, обеспечивая умный поиск без утечки конфиденциальной информации.`
      },
      pt: {
        title: 'Inteligencia de Documentos: Busca Vetorial Direto no Navegador',
        description: 'Como implementamos busca semantica com WebAssembly e modelos quantizados sem conexao com servidores externos.',
        content: `Criamos uma solucao onde os embeddings e o calculo de similaridade de cosseno acontecem 100% no cliente, garantindo privacidade total para anotacoes pessoais.`
      },
      tr: {
        title: 'Belge Zekasi: Tarayicida Yerel Vektor Arama ve Semantik Esleme',
        description: 'WebAssembly ve kucuk yapay zeka modelleri ile harici sunucuya baglanmadan tarayicida anlamsal metin arama.',
        content: `Kisisel notlarinizi disariya aktarmadan, WebAssembly tabanli vektor hesaplama ile tarayiciniz icinde saniyeler icinde arama yapabilen bir prototip gelistirdim.`
      },
      fr: {
        title: 'Intelligence Documentaire : Recherche Vectorielle Locale dans le Navigateur',
        description: 'Comment calculer des embeddings et executer une recherche semantique grace a WebAssembly sans solliciter d API distante.',
        content: `Ce prototype permet de vectoriser vos notes et d effectuer une recherche par similarite directement dans la memoire du navigateur, sans aucune fuite de donnees.`
      },
      es: {
        title: 'Inteligencia Documental: Busqueda Vectorial Local en el Navegador',
        description: 'Implementacion de busqueda semantica con WebAssembly y modelos cuantizados en el cliente sin servidores externos.',
        content: `Exploramos la generacion de embeddings y el calculo de similitud de coseno directamente en el navegador, preservando el 100% de la privacidad de tus notas.`
      }
    }
  },
  {
    slug: 'webassembly-web-workers-browser-operating-system',
    pubDate: '2026-11-06',
    readingTime: 7,
    category: 'Capabilities',
    tool: 'Browser Sandboxing',
    tags: ['webassembly', 'web-workers', 'client-os', 'sandboxing'],
    locales: {
      en: {
        title: 'WebAssembly and Web Workers: Turning the Browser into a Client Operating System',
        description: 'How modern web primitives allow solo engineers to run C/C++, Rust, and full execution environments directly on the users hardware.',
        content: `For decades, the web browser was viewed as a passive document reader: an engine designed to lay out hypertext and style basic forms. Complex computation, audio compression, video transcoding, and code execution were strictly relegated to backend Linux servers.

Over the past five years, the web platform underwent a silent revolution. The advent of **WebAssembly (WASM)**, **SharedArrayBuffer**, and **Dedicated Web Workers** transformed the browser into a universal, sandboxed client operating system.

## Breaking the Single-Thread Bottleneck

JavaScript's traditional runtime model is single-threaded. Any heavy computation: parsing a 200-page PDF or compiling a C++ module: blocks the browser's event loop, causing dropped frames and unresponsiveness.

Web Workers allow developers to spawn true OS-level background threads. When paired with WebAssembly, computation runs at near-native CPU speeds:

\`\`\`typescript
// worker.ts - Background worker thread
import initWasm, { compileModule } from './pkg/native_engine';

self.onmessage = async (e: MessageEvent<Uint8Array>) => {
  await initWasm();
  const sourceCode = e.data;
  const compiledBinary = compileModule(sourceCode);
  self.postMessage(compiledBinary, [compiledBinary.buffer]);
};
\`\`\`

## Zero Infrastructure, Infinite Horizontal Scalability

When your application logic runs client-side via WebAssembly:
- **Server bills drop to zero**: The user provides the CPU, RAM, and GPU.
- **DDoS resilience**: A surge of 100,000 visitors does not stress backend compute clusters.
- **Instant response**: Latency is bounded by memory bus speed, not transatlantic fiber optics.

At LadeStack, we treat client-side WebAssembly not as an experimental toy, but as the primary engine of modern software delivery.`
      },
      jp: {
        title: 'WebAssemblyとWeb Workers：ブラウザを万能OSへと進化させる技術',
        description: 'C/C++やRustをブラウザ内でネイティブに近い速度で実行し、サーバー不要のゼロコスト運用を実現するWebアーキテクチャ。',
        content: `WebAssembly (WASM) と Web Workers の登場により、かつてバックエンドサーバーが担っていた重い演算処理を、ユーザー端末のハードウェア上で安全かつ高速に実行できるようになりました。

これによりサーバー維持費がゼロに近づき、ユーザーのプライバシーを守りながら圧倒的な処理速度を提供できます。`
      },
      ko: {
        title: 'WebAssembly와 Web Workers: 브라우저를 클라이언트 운영체제로 전환하기',
        description: 'Rust와 C++ 코드를 브라우저에서 준네이티브 속도로 구동하여 클라우드 비용을 없애고 처리 성능을 극대화하는 기법.',
        content: `현대 웹 브라우저는 단순한 뷰어가 아닌 범용 샌드박스 가상 머신입니다. WebAssembly와 백그라운드 워커를 결합하면 대용량 파일 컴파일과 그래픽 연산을 클라이언트에서 지연 없이 수행할 수 있습니다.`
      },
      zh: {
        title: 'WebAssembly 与 Web Workers：将浏览器重构为通用计算系统',
        description: '剖析现代 Web 底层原语如何支持 Rust 与 C++ 高性能模块在前端硬件上近乎原生运行，实现零服务器负载架构。',
        content: `浏览器已从简单的超文本渲染器演进为强大的客户端虚拟机。通过深度协同 WebAssembly 和多线程 Web Workers，前端工程师可以直接调度用户硬件算力，实现极致性能与无限横向扩展。`
      },
      ru: {
        title: 'WebAssembly и Web Workers: превращение браузера в операционную систему',
        description: 'Как запускать модули на C/C++ и Rust прямо на устройстве пользователя со скоростью нативных приложений.',
        content: `Использование **WebAssembly** и фоновых потоков позволяет перенести тяжелые вычисления с удаленных серверов прямо в браузер пользователя, обеспечивая максимальную скорость и экономию ресурсов.`
      },
      pt: {
        title: 'WebAssembly e Web Workers: Transformando o Navegador em um SO Cliente',
        description: 'Como executar codigo nativo em Rust e C++ na maquina do usuario com maxima velocidade e zero custo de servidor.',
        content: `Com **WebAssembly** e Web Workers, o navegador moderno roda processos complexos localmente, eliminando gargalos de rede e custos de infraestrutura.`
      },
      tr: {
        title: 'WebAssembly ve Web Workers: Tarayiciyi Istemci Isletim Sistemine Donusturmek',
        description: 'C++ ve Rust kodlarini tarayicida yerel performansa yakin calistirarak sunucusuz mimari kurmanin yollari.',
        content: `**WebAssembly** teknolojisi tarayiciyi guclu bir calisma ortamina cevirir. Hesaplamalar dogrudan kullanicinin islemcisinde gerceklesir, sunucu maliyetleri sifira iner.`
      },
      fr: {
        title: 'WebAssembly et Web Workers : Faire du Navigateur un Systeme d Exploitation',
        description: 'Comment executer du code Rust et C++ avec des performances quasi-natives directement sur le materiel du client.',
        content: `L alliance de **WebAssembly** et des Web Workers libere la puissance de calcul des machines clientes, permettant de concevoir des outils ultra-rapides sans frais de serveur.`
      },
      es: {
        title: 'WebAssembly y Web Workers: El Navegador Como Sistema Operativo del Cliente',
        description: 'Como compilar y ejecutar modulos en Rust y C++ a velocidad nativa en el dispositivo del usuario sin servidores centrales.',
        content: `Con **WebAssembly** y Workers, convertimos el navegador en un motor de computo seguro, garantizando escalabilidad infinita y respuesta instantanea.`
      }
    }
  },
  {
    slug: 'design-systems-three-tier-tokens-accessibility',
    pubDate: '2026-11-06',
    readingTime: 6,
    category: 'Capabilities',
    tool: 'Design Systems',
    tags: ['design-systems', 'design-tokens', 'accessibility', 'wcag-2-2'],
    locales: {
      en: {
        title: 'Scalable Design Systems: Building Resilient Three-Tier Token Architectures',
        description: 'How we eliminate hardcoded styling, guarantee WCAG 2.2 AA contrast compliance, and support seamless multi-brand theming using tiered design tokens.',
        content: `Most design systems start with great intentions. A designer hands off a Figma file, a developer creates a \`tailwind.config.js\` with twenty shades of gray, and everyone is happy. Within six months, the codebase is littered with rogue hex codes (\`#1a1a24\`, \`#23232f\`), unreadable contrast combinations on mobile screens, and inconsistent button states.

To build UI that survives long-term product iterations, you need a **Three-Tier Design Token Architecture**.

## The Three Tiers of Token Architecture

Instead of referencing raw values directly in components, we route every visual property through three layers of abstraction:

\`\`\`
[ Tier 1: Primitive Tokens ] -> Raw values (#09090b, 16px, 200ms)
            |
[ Tier 2: Semantic Tokens ]  -> Intent-based aliases (action.primary, surface.muted)
            |
[ Tier 3: Component Tokens ] -> Exact element bounds (button.primary.hover.bg)
\`\`\`

### 1. Primitive Tokens
The physical palette of your system:
\`\`\`css
:root {
  --color-zinc-950: #09090b;
  --color-zinc-100: #f4f4f5;
  --color-zinc-500: #71717a;
}
\`\`\`

### 2. Semantic Tokens
The intent and purpose of a value:
\`\`\`css
:root {
  --surface-base: #fafafa;
  --surface-card: #ffffff;
  --text-main: var(--color-zinc-950);
  --text-muted: var(--color-zinc-500);
  --action-primary: var(--color-zinc-950);
  --border-subtle: rgba(228, 228, 231, 0.8);
}
\`\`\`

### 3. Component Tokens
Scoped precisely to element states:
\`\`\`css
.btn-primary {
  background-color: var(--action-primary);
  color: var(--surface-card);
}
\`\`\`

## Enforcing WCAG 2.2 AA Accessibility

Every text-to-background combination in our semantic layer is mathematically tested against WCAG contrast algorithms. Normal body text guarantees a minimum 4.5:1 ratio, while large display headings achieve at least 3.0:1.

Furthermore, we enforce:
- Zero native \`<select>\` dropdowns with platform-specific chevrons.
- Strict 44x44px minimum touch targets for mobile accessibility.
- Zero reliance on color alone to communicate state.

Systematic design produces durable software.`
      },
      jp: {
        title: '3層デザイントークンとアクセシビリティ（WCAG 2.2）を両立するUI設計',
        description: 'ハードコードを全廃し、プリミティブ・セマンティック・コンポーネントの3層トークンで保守性の高いWebインターフェースを作る手法。',
        content: `保守しやすいWebアプリケーションを構築するためには、色や余白の直接指定を排除し、**3層デザイントークン構造**を導入することが不可欠です。

意図に基づいたセマンティックトークンを用いることで、WCAG 2.2 AAのコントラスト比を数学的に保証し、一貫した操作感を提供できます。`
      },
      ko: {
        title: '확장 가능한 디자인 시스템: 3계층 토큰 아키텍처와 웹 접근성',
        description: '하드코딩된 스타일을 제거하고 WCAG 2.2 AA 기준을 충족하는 3계층 디자인 토큰 설계 전략.',
        content: `하드코딩된 색상 코드는 시간이 흐를수록 UI 일관성을 해칩니다.

LadeStack은 원시값(Primitive), 의미 기반(Semantic), 컴포넌트(Component)로 구성된 3계층 디자인 토큰 아키텍처를 도입하여 접근성과 심미성을 동시에 유지합니다.`
      },
      zh: {
        title: '高扩展设计系统：构建三层 Token 架构与无障碍 UI 规范',
        description: '杜绝硬编码样式，基于三层设计 Token 规范全面满足 WCAG 2.2 AA 级无障碍对比度，实现优雅的主题管控。',
        content: `优秀的设计系统必须经历产品迭代的考验。通过将样式解耦为基础 Token、语义 Token 与组件 Token，配合严格的无障碍对比度验证，能够确保全系产品始终呈现统一、舒适的视觉质感。`
      },
      ru: {
        title: 'Масштабируемые дизайн-системы: трехуровневая архитектура токенов',
        description: 'Как исключить жестко закодированные стили и обеспечить соответствие стандартам доступности WCAG 2.2 AA.',
        content: `Использование трехуровневой архитектуры дизайн-токенов (базовые, семантические, компонентные) позволяет гарантировать контрастность по стандарту WCAG 2.2 AA и легко обновлять интерфейсы.`
      },
      pt: {
        title: 'Sistemas de Design Escalaveis: Arquitetura de Tokens em Tres Camadas',
        description: 'Como eliminar estilos manuais soltos e garantir conformidade com WCAG 2.2 AA atraves de tokens semanticos.',
        content: `A organizacao dos tokens em tres camadas estruturadas assegura manutencao simples, coerencia visual e acessibilidade impecavel em todos os dispositivos.`
      },
      tr: {
        title: 'Olceklenebilir Tasarim Sistemleri: Uc Katmanli Token Mimarisi',
        description: 'Sabit stil kodlarindan kurtulmak ve WCAG 2.2 AA erisilebilirlik kriterlerini saglamak icin token mimarisi.',
        content: `Uc katmanli tasarim token yapisi (ham, anlamsal, bilesen) sayesinde renk ve tipografi secimleri merkezi olarak yonetilir, erisilebilirlik standartlari tam karsilanir.`
      },
      fr: {
        title: 'Design Systems Evolutifs : Architecture de Tokens a Trois Niveaux',
        description: 'Eliminer les valeurs en dur et garantir l accessibilite WCAG 2.2 AA grace a une structure de tokens semantiques.',
        content: `En decouplant les primitives, la semantique et les composants, nous creons une interface accessible, harmonieuse et durable dans le temps.`
      },
      es: {
        title: 'Sistemas de Diseno Escalables: Arquitectura de Tokens en Tres Niveles',
        description: 'Estandarizando la interfaz con tokens semanticos y asegurando accesibilidad WCAG 2.2 AA sin estilos fijos.',
        content: `La arquitectura de tokens en tres niveles garantiza coherencia visual, alto contraste y facil adaptacion a nuevos temas y componentes.`
      }
    }
  },
  {
    slug: 'performance-conscious-frontend-60fps-web',
    pubDate: '2026-11-07',
    readingTime: 6,
    category: 'Capabilities',
    tool: 'Performance Engineering',
    tags: ['web-performance', '60fps', 'composite-layers', 'layout-shifts'],
    locales: {
      en: {
        title: 'Performance-Conscious Frontend: Engineering Smooth 60 FPS Web Interfaces',
        description: 'How to avoid layout thrashing, leverage GPU compositing layers, and minimize JavaScript garbage collection pauses on budget mobile hardware.',
        content: `A beautiful website that drops frames during scroll is an unpleasant experience. On flagship desktop monitors with 144Hz refresh rates, sloppy JavaScript code often masquerades as acceptable. But on an entry-level smartphone with thermal throttling, inefficient DOM manipulation causes noticeable lag, delayed touches, and battery drain.

Engineering for performance requires understanding the browser's internal rendering pipeline.

## The Critical Rendering Path: Layout, Paint, Composite

Whenever you alter an element's CSS properties, the browser executes one of three pipelines:

1. **Geometry Alterations** (\`width\`, \`height\`, \`top\`, \`margin\`): Triggers full **Reflow / Layout**, recalculating coordinates for every descendant on the page.
2. **Visual Alterations** (\`background\`, \`color\`, \`box-shadow\`): Skips layout but triggers **Repaint**, re-rasterizing pixels into bitmaps.
3. **Compositing Alterations** (\`transform\`, \`opacity\`): Bypasses both layout and paint! Elements are handled directly as textures on the GPU.

To maintain an unshakeable 60 FPS (giving your code a strict budget of 16.6 milliseconds per frame), all interactive motions in our portfolio and applications stick strictly to **transform and opacity**.

\`\`\`css
/* High-performance hardware-accelerated transitions */
.smooth-card {
  will-change: transform;
  transform: translate3d(0, 0, 0);
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease;
}
\`\`\`

## Eliminating Layout Thrashing

Layout thrashing happens when JavaScript repeatedly writes to the DOM and immediately reads geometric properties (\`offsetHeight\`, \`getBoundingClientRect\`), forcing the browser into continuous synchronous reflow loops.

By batching DOM reads before writes or utilizing \`requestAnimationFrame\`, layout thrashing is completely eliminated.

Speed is the fundamental feature that makes modern web software feel delightful.`
      },
      jp: {
        title: 'パフォーマンス指向のフロントエンド：滑らかな60FPSを実現する描画設計',
        description: 'レイアウトスラッシングの防止、GPUコンポジットレイヤーの活用、低スペック端末でも快適に動く最適化手法。',
        content: `スクロール時に引っかかりが生じるUIはユーザー体験を大きく損ないます。

本ポートフォリオでは、リフローや再描画を極力避け、GPU上で直接合成される \`transform\` と \`opacity\` のみを用いてアニメーションを設計しています。これにより、モバイル端末でも安定した60 FPSを維持しています。`
      },
      ko: {
        title: '성능 중심 프론트엔드: 60 FPS의 부드러운 웹 인터페이스 구현 기법',
        description: '레이아웃 스래싱 방지, GPU 컴포지트 레이어 활용, 저사양 기기에서도 매끄러운 렌더링 최적화 노하우.',
        content: `프론트엔드 성능은 사용자 만족도의 핵심입니다. 리플로우를 유발하는 속성 대신 GPU 가속 속성을 사용하여 저사양 스마트폰에서도 배터리 소모 없이 60 FPS를 안정적으로 유지하는 방법을 다룹니다.`
      },
      zh: {
        title: '性能至上前瞻实践：在现代 Web 中打造坚挺的 60 FPS 体验',
        description: '深度剖析浏览器关键渲染流水线，借助合成层优化与强制同步布局消除，让低算力设备同样丝滑顺畅。',
        content: `避免在动画中使用触发几何重排的属性，全面依托 GPU 合成层驱动的 \`transform\` 与 \`opacity\`，并严格杜绝读写交替造成的强制同步重排，从而保证全平台 60 FPS 满帧运行。`
      },
      ru: {
        title: 'Производительный фронтенд: плавные 60 FPS на любых устройствах',
        description: 'Оптимизация критического пути рендеринга, использование GPU и устранение задержек на смартфонах.',
        content: `Мы строим интерфейсы с упором на аппаратное ускорение через GPU, избегая перерисовок страницы и сохраняя стабильные 60 FPS даже на бюджетных телефонах.`
      },
      pt: {
        title: 'Frontend Consciente de Performance: Construindo Interfaces a 60 FPS',
        description: 'Como evitar layout thrashing e usar aceleracao de hardware no navegador para animacoes ultra-fluidas.',
        content: `Ao restringir animacoes a transform e opacity acelerados pela GPU, garantimos respostas instantaneas e fluidez constante de 60 quadros por segundo.`
      },
      tr: {
        title: 'Performans Odakli Frontend: 60 FPS Akici Web Arayuzleri Gelistirmek',
        description: 'Tarayici render dongusunu optimize ederek dusuk guclu telefonlarda bile takilmayan arayuz tasarimi.',
        content: `Animasyonlari dogrudan ekran karti (GPU) uzerinde hesaplanan ozelliklerle sinirlandirarak akilli telefonlarda 60 FPS akiciligi koruyoruz.`
      },
      fr: {
        title: 'Frontend Haute Performance : Concevoir des Interfaces Fluides a 60 FPS',
        description: 'Comment eviter les recalculs de mise en page et exploiter le GPU pour une fluidite irreprochable.',
        content: `En ciblant exclusivement les proprietes compositees par le GPU, nous garantissons des animations a 60 images par seconde sans vider la batterie de vos appareils.`
      },
      es: {
        title: 'Frontend de Alto Rendimiento: Interfaces Web Fluidas a 60 FPS',
        description: 'Optimizacion del flujo de renderizado en el navegador para evitar saltos y tirones en cualquier pantalla.',
        content: `Optimizamos cada movimiento apoyandonos en capas de composicion aceleradas por GPU, asegurando 60 FPS constantes en moviles de cualquier gama.`
      }
    }
  },
  {
    slug: 'building-in-public-independent-developer-philosophy',
    pubDate: '2026-11-07',
    readingTime: 6,
    category: 'Practice',
    tool: 'Solo Philosophy',
    tags: ['building-in-public', 'solo-developer', 'open-source', 'career'],
    locales: {
      en: {
        title: 'Building in Public: Why Production Code Replaces the Traditional Resume',
        description: 'How an open engineering portfolio, live tools, and transparent technical writing create undeniable proof of execution for software engineers.',
        content: `In the modern software job market, a traditional two-page resume is becoming increasingly obsolete. Anyone can fill a PDF with impressive buzzwords: "leveraged Kubernetes," "architected microservices," "streamlined CI/CD." But without verifiable proof, words are cheap.

When I transitioned from mechanical engineering into full-stack development, I had no prestigious computer science credentials. I could not rely on brand-name tech companies on my CV to open doors.

Instead, I chose to **build in public**.

## Proof of Execution Over Credentials

Building in public means letting your work speak for itself:
- **9 Live Web Applications**: Real products that people can open, interact with, and stress-test on their own devices.
- **Open GitHub Source Code**: Readable, well-documented, tested TypeScript repositories that demonstrate craftsmanship, architecture, and attention to detail.
- **Deep Technical Articles**: Transparent documentation explaining why architectural choices were made and what trade-offs were accepted.

## The Freedom of the Independent Product Builder

When you operate as an independent product builder, you learn every phase of the software lifecycle:
1. Identifying genuine real-world friction.
2. Designing intuitive, dignified UI/UX.
3. Writing clean, type-safe full-stack implementations.
4. Deploying static, secure, and fast architectures.
5. Communicating directly with users across the globe.

A live product portfolio is an immutable digital asset that compounds over time. Build real things, share the process honestly, and let your code be your credential.`
      },
      jp: {
        title: 'ビルド・イン・パブリック：公開されたプロダクトが履歴書を超える理由',
        description: '机上の経歴書ではなく、実際に稼働する9つのWebツールとオープンソースリポジトリで実力を証明する開発哲学。',
        content: `どれほど立派なキーワードを並べた履歴書よりも、実際に誰でも触れて検証できるプロダクト群のほうが雄弁に技術力を物語ります。

私はLadeStackを通じて開発プロセスを公開し、動くソフトウェアそのものを自身の信用として積み上げています。`
      },
      ko: {
        title: '빌딩 인 퍼블릭: 동작하는 프로덕션 코드가 이력서를 대체하는 이유',
        description: '실제 서비스 중인 9개의 웹 앱과 오픈소스 저장소를 통해 말보다 코드로 실력을 증명하는 1인 빌더의 철학.',
        content: `단순한 이력서의 나열보다 누구나 접속해 테스트할 수 있는 실제 제품이 훨씬 더 강력한 신뢰를 만듭니다.

공개된 코드와 깊이 있는 기술 문서를 통해 꾸준히 가치를 증명해 나가고 있습니다.`
      },
      zh: {
        title: '公开构建哲学：为什么上线运行的产品胜过百份简历',
        description: '解析独立开发者如何借助真实运转的 9 款轻量工具、开源代码库与深度技术手记，建立无法否认的执行力凭证。',
        content: `简历上的溢美之词容易造假，但能够承受真实访问压力的产品无法伪造。通过公开构建，将可交互的软件、规范的工程源码与公开的技术笔记作为最硬核的个人资产。`
      },
      ru: {
        title: 'Открытая разработка: почему реальные проекты ценнее резюме',
        description: 'Как 9 работающих инструментов и открытый исходный код создают безупречное доказательство инженерного опыта.',
        content: `Вместо шаблонных фраз в резюме я предпочитаю показывать реальный результат: 9 работающих сервисов, открытый код на GitHub и прозрачную техническую документацию.`
      },
      pt: {
        title: 'Construindo em Publico: Por Que Codigo Real Substitui o Curriculo',
        description: 'Como 9 aplicacoes no ar e repositorios abertos comprovam competencia tecnica de maneira inquestionavel.',
        content: `Construir em publico significa provar capacidade na pratica: produtos funcionais, codigo limpo e aberto, e textos tecnicos honestos sao o melhor portfolio que existe.`
      },
      tr: {
        title: 'Acikta Gelistirmek: Calisan Kodun Klasik Ozgecmisi Nasil Eledigi',
        description: 'Yayindaki 9 gercek arac ve acik kaynak kodlarla muhendislik yetkinligini somut olarak kanitlama felsefesi.',
        content: `Suslu sozler yerine canli urunler sunmak en durust yoldur. 9 farkli calisan uygulama ile gercek cozumler uretmenin gucune inaniyorum.`
      },
      fr: {
        title: 'Construire en Public : Pourquoi les Logiciels Reels Remplacent le CV',
        description: 'Comment 9 outils fonctionnels et des depots open source constituent la preuve ultime de vos competences d ingenieur.',
        content: `Plutot que d aligner des mots-cles sur un CV, je donne acces a 9 applications concretes et du code open source soigneusement structure.`
      },
      es: {
        title: 'Construir en Publico: Por Que el Codigo Real Supera al Curriculum',
        description: 'Como 9 aplicaciones en produccion y repositorios abiertos validan la capacidad de ejecucion de un ingeniero.',
        content: `En lugar de redactar un curriculum tradicional, demuestro mi trabajo a traves de 9 utilidades reales accesibles para cualquier persona en la web.`
      }
    }
  }
];

let totalWritten = 0;
for (const article of articles) {
  for (const lang of LOCALES) {
    const locData = article.locales[lang] || article.locales['en'];
    const dir = path.join(process.cwd(), 'src', 'content', 'blog', lang);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${article.slug}.md`);
    const fileContent = `---
title: "${locData.title.replace(/"/g, '\\"')}"
description: "${locData.description.replace(/"/g, '\\"')}"
pubDate: "${article.pubDate}"
readingTime: ${article.readingTime}
category: "${article.category}"
slug: "${article.slug}"
lang: "${lang}"
tags: [${article.tags.map(t => `"${t}"`).join(', ')}]
tool: "${article.tool}"
---

${locData.content}
`;
    fs.writeFileSync(filePath, fileContent, 'utf8');
    totalWritten++;
  }
}

console.log(`Successfully generated batch 5: ${totalWritten} markdown files.`);
