export const LOCALES = ['en', 'mr', 'jp', 'ko', 'zh', 'ru', 'pt', 'tr', 'fr', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMetadata {
  code: Locale;
  label: string;
  nativeName: string;
  htmlLang: string;
  ogLocale: string;
}

export const LOCALE_METADATA: Record<Locale, LocaleMetadata> = {
  en: {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  jp: {
    code: 'jp',
    label: 'Japanese',
    nativeName: '日本語',
    htmlLang: 'ja',
    ogLocale: 'ja_JP',
  },
  ko: {
    code: 'ko',
    label: 'Korean',
    nativeName: '한국어',
    htmlLang: 'ko',
    ogLocale: 'ko_KR',
  },
  zh: {
    code: 'zh',
    label: 'Chinese',
    nativeName: '中文',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
  },
  ru: {
    code: 'ru',
    label: 'Russian',
    nativeName: 'Русский',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
  },
  pt: {
    code: 'pt',
    label: 'Portuguese',
    nativeName: 'Português',
    htmlLang: 'pt',
    ogLocale: 'pt_BR',
  },
  tr: {
    code: 'tr',
    label: 'Turkish',
    nativeName: 'Türkçe',
    htmlLang: 'tr',
    ogLocale: 'tr_TR',
  },
  fr: {
    code: 'fr',
    label: 'French',
    nativeName: 'Français',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
  },
  es: {
    code: 'es',
    label: 'Spanish',
    nativeName: 'Español',
    htmlLang: 'es',
    ogLocale: 'es_ES',
  },
  mr: {
    code: 'mr',
    label: 'Marathi',
    nativeName: 'मराठी',
    htmlLang: 'mr',
    ogLocale: 'mr_IN',
  },
};

export interface UIStrings {
  siteTitle: string;
  siteDescription: string;
  brandName: string;
  nav: {
    home: string;
    info: string;
    projects: string;
    journey: string;
    blog: string;
    languageLabel: string;
  };
  home: {
    shellKicker: string;
    shellHeadline: string;
    shellSubtext: string;
    exploreBlogCta: string;
    infoTitle: string;
    infoPlaceholder: string;
    projectsTitle: string;
    projectsPlaceholder: string;
    journeyTitle: string;
    journeyPlaceholder: string;
    awaitingContentLabel: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readArticle: string;
    backToBlog: string;
    publishedOn: string;
    readingTime: string;
    allPostsLabel: string;
    markdownBadge: string;
    availableLanguages: string;
    tableOfContents: string;
    copyLink: string;
    copiedLink: string;
    searchPlaceholder: string;
    searchAriaLabel: string;
    clearSearch: string;
    noResultsTitle: string;
    noResultsHint: string;
    filterAll: string;
    paginationPrev: string;
    paginationNext: string;
    pageOf: string;
    showingResults: string;
  };
  footer: {
    rights: string;
    seoNote: string;
    activeLocaleLabel: string;
  };
}

export const UI_TRANSLATIONS: Record<Locale, UIStrings> = {
  en: {
    siteTitle: 'Portfolio & Blog — Minimal Astro Edition',
    siteDescription: 'Minimal, SEO-optimized multilingual portfolio and Markdown blog built entirely with Astro JS across 9 languages.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'Home',
      info: 'Info',
      projects: 'Projects',
      journey: 'Journey',
      blog: 'Blog',
      languageLabel: 'Select language',
    },
    home: {
      shellKicker: 'Astro JS · Multilingual Structure',
      shellHeadline: 'Clean Homepage Canvas',
      shellSubtext: 'Navigation bar, minimal body layout, and footer are configured. Content sections for Info, Projects, and Journey are kept clean and ready for your custom details.',
      exploreBlogCta: 'Read Blog Posts',
      infoTitle: '01. Info',
      infoPlaceholder: 'Reserved for user introduction, profile details, and core expertise.',
      projectsTitle: '02. Projects',
      projectsPlaceholder: 'Reserved for featured case studies, repositories, and technical work.',
      journeyTitle: '03. Journey',
      journeyPlaceholder: 'Reserved for career milestones, timeline, and experience.',
      awaitingContentLabel: 'Ready for content',
    },
    blog: {
      title: 'Blog & Writings',
      subtitle: 'Articles authored in pure Markdown and compiled directly to semantic HTML via Astro.',
      readArticle: 'Read article',
      backToBlog: 'Back to all articles',
      publishedOn: 'Published',
      readingTime: 'min read',
      allPostsLabel: 'All Articles',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: 'Read this article in other languages',
      tableOfContents: 'On this page',
      copyLink: 'Copy link',
      copiedLink: 'Link copied',
      searchPlaceholder: 'Search articles by title, topic, tool, or tags...',
      searchAriaLabel: 'Search blog articles',
      clearSearch: 'Clear search',
      noResultsTitle: 'No articles found',
      noResultsHint: 'Try adjusting your search terms or selecting another category filter.',
      filterAll: 'All Topics',
      paginationPrev: 'Previous',
      paginationNext: 'Next',
      pageOf: 'Page {current} of {total}',
      showingResults: 'Showing {count} articles',
    },
    footer: {
      rights: 'All rights reserved.',
      seoNote: 'Built with Astro JS · Native i18n & SEO Optimized',
      activeLocaleLabel: 'Language',
    },
  },
  jp: {
    siteTitle: 'ポートフォリオ＆ブログ — ミニマル Astro エディション',
    siteDescription: '9言語に対応し、Astro JSのみで構築されたミニマルでSEO最適化された多言語ポートフォリオおよびMarkdownブログ。',
    brandName: 'Girish Lade.',
    nav: {
      home: 'ホーム',
      info: 'プロフィール',
      projects: 'プロジェクト',
      journey: '経歴',
      blog: 'ブログ',
      languageLabel: '言語を選択',
    },
    home: {
      shellKicker: 'Astro JS · 多言語構造',
      shellHeadline: 'クリーンなホームページキャンバス',
      shellSubtext: 'ナビゲーションバー、ミニマルなボディレイアウト、フッターが構築されています。プロフィール、プロジェクト、経歴の各セクションはクリーンな状態で準備されています。',
      exploreBlogCta: 'ブログ記事を読む',
      infoTitle: '01. プロフィール (Info)',
      infoPlaceholder: '自己紹介、プロフィール詳細、専門スキル用のスペースです。',
      projectsTitle: '02. プロジェクト (Projects)',
      projectsPlaceholder: '主要な制作実績、リポジトリ、技術プロジェクト用のスペースです。',
      journeyTitle: '03. 経歴・歩み (Journey)',
      journeyPlaceholder: 'キャリアのマイルストーン、タイムライン、経験用のスペースです。',
      awaitingContentLabel: 'コンテンツ準備完了',
    },
    blog: {
      title: 'ブログ＆記事',
      subtitle: '純粋なMarkdownで執筆され、AstroによってセマンティックなHTMLへ直接変換された記事一覧。',
      readArticle: '記事を読む',
      backToBlog: '記事一覧に戻る',
      publishedOn: '公開日',
      readingTime: '分で読めます',
      allPostsLabel: 'すべての記事',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: 'この記事を他の言語で読む',
      tableOfContents: '目次',
      copyLink: 'リンクをコピー',
      copiedLink: 'コピーしました',
      searchPlaceholder: '記事のタイトル、トピック、ツール、タグで検索...',
      searchAriaLabel: 'ブログ記事を検索',
      clearSearch: '検索をクリア',
      noResultsTitle: '記事が見つかりませんでした',
      noResultsHint: '検索キーワードを変更するか、別のカテゴリーを選択してください。',
      filterAll: 'すべてのトピック',
      paginationPrev: '前へ',
      paginationNext: '次へ',
      pageOf: '{total} ページ中 {current} ページ',
      showingResults: '{count} 件の記事を表示中',
    },
    footer: {
      rights: 'All rights reserved.',
      seoNote: 'Astro JSで構築 · ネイティブi18nおよびSEO最適化済み',
      activeLocaleLabel: '言語',
    },
  },
  ko: {
    siteTitle: '포트폴리오 & 블로그 — 미니멀 Astro 에디션',
    siteDescription: '9개 국어를 지원하며 Astro JS로만 제작된 미니멀하고 SEO에 최적화된 다국어 포트폴리오 및 마크다운 블로그입니다.',
    brandName: 'Girish Lade.',
    nav: {
      home: '홈',
      info: '정보',
      projects: '프로젝트',
      journey: '여정',
      blog: '블로그',
      languageLabel: '언어 선택',
    },
    home: {
      shellKicker: 'Astro JS · 다국어 아키텍처',
      shellHeadline: '깔끔한 홈페이지 캔버스',
      shellSubtext: '내비게이션 바, 미니멀 바디 레이아웃, 푸터가 준비되었습니다. 정보, 프로젝트, 여정 섹션은 사용자 콘텐츠 입력을 위해 비워 두었습니다.',
      exploreBlogCta: '블로그 글 보기',
      infoTitle: '01. 정보 (Info)',
      infoPlaceholder: '사용자 소개, 프로필 세부 정보 및 핵심 역량을 위한 공간입니다.',
      projectsTitle: '02. 프로젝트 (Projects)',
      projectsPlaceholder: '주요 프로젝트, 저장소 및 기술 작업물을 위한 공간입니다.',
      journeyTitle: '03. 여정 (Journey)',
      journeyPlaceholder: '경력 이정표, 타임라인 및 경험을 위한 공간입니다.',
      awaitingContentLabel: '콘텐츠 준비됨',
    },
    blog: {
      title: '블로그 & 아티클',
      subtitle: '순수 마크다운(Markdown)으로 작성되어 Astro를 통해 시맨틱 HTML로 직접 변환된 글입니다.',
      readArticle: '글 읽기',
      backToBlog: '모든 글로 돌아가기',
      publishedOn: '게시일',
      readingTime: '분 소요',
      allPostsLabel: '전체 글',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: '다른 언어로 이 글 읽기',
      tableOfContents: '목차',
      copyLink: '링크 복사',
      copiedLink: '링크 복사됨',
      searchPlaceholder: '제목, 주제, 도구, 태그로 글 검색...',
      searchAriaLabel: '블로그 글 검색',
      clearSearch: '검색어 지우기',
      noResultsTitle: '기사를 찾을 수 없습니다',
      noResultsHint: '검색어를 조정하거나 다른 카테고리 필터를 선택해 보세요.',
      filterAll: '모든 주제',
      paginationPrev: '이전',
      paginationNext: '다음',
      pageOf: '{total}페이지 중 {current}페이지',
      showingResults: '{count}개의 기사 표시 중',
    },
    footer: {
      rights: 'All rights reserved.',
      seoNote: 'Astro JS 기반 · 네이티브 i18n 및 SEO 최적화',
      activeLocaleLabel: '언어',
    },
  },
  zh: {
    siteTitle: '个人作品集与博客 — 极简 Astro 版',
    siteDescription: '纯 Astro JS 构建的极简、SEO 优化的多语言作品集与 Markdown 博客，支持 9 种语言。',
    brandName: 'Girish Lade.',
    nav: {
      home: '首页',
      info: '简介',
      projects: '项目',
      journey: '历程',
      blog: '博客',
      languageLabel: '选择语言',
    },
    home: {
      shellKicker: 'Astro JS · 多语言架构',
      shellHeadline: '极简主页画布',
      shellSubtext: '导航栏、极简主体结构与页脚已配置完毕。个人简介、项目展示与成长历程区域保持干净留白，随时可根据您的指示填入内容。',
      exploreBlogCta: '阅读博客文章',
      infoTitle: '01. 个人简介 (Info)',
      infoPlaceholder: '预留用于个人介绍、资料详情与核心技术栈展示。',
      projectsTitle: '02. 项目展示 (Projects)',
      projectsPlaceholder: '预留用于精选案例研究、代码仓库与技术作品。',
      journeyTitle: '03. 成长历程 (Journey)',
      journeyPlaceholder: '预留用于职业里程碑、时间线与实践经历。',
      awaitingContentLabel: '待添加内容',
    },
    blog: {
      title: '博客与文章',
      subtitle: '使用纯 Markdown 编写，并通过 Astro 直接编译转换为语义化 HTML。',
      readArticle: '阅读全文',
      backToBlog: '返回文章列表',
      publishedOn: '发布于',
      readingTime: '分钟阅读',
      allPostsLabel: '全部文章',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: '使用其他语言阅读本文',
      tableOfContents: '本文目录',
      copyLink: '复制链接',
      copiedLink: '已复制链接',
      searchPlaceholder: '按标题、主题、工具或标签搜索文章...',
      searchAriaLabel: '搜索博客文章',
      clearSearch: '清除搜索',
      noResultsTitle: '未找到相关文章',
      noResultsHint: '请尝试调整搜索词或选择其他分类筛选。',
      filterAll: '全部主题',
      paginationPrev: '上一页',
      paginationNext: '下一页',
      pageOf: '第 {current} 页，共 {total} 页',
      showingResults: '显示 {count} 篇文章',
    },
    footer: {
      rights: '保留所有权利。',
      seoNote: '基于 Astro JS 构建 · 原生 i18n 与 SEO 优化',
      activeLocaleLabel: '语言',
    },
  },
  ru: {
    siteTitle: 'Портфолио и Блог — Минималистичное издание на Astro',
    siteDescription: 'Минималистичное многоязычное портфолио и Markdown-блог с SEO-оптимизацией, созданные полностью на Astro JS на 9 языках.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'Главная',
      info: 'Инфо',
      projects: 'Проекты',
      journey: 'Путь',
      blog: 'Блог',
      languageLabel: 'Выберите язык',
    },
    home: {
      shellKicker: 'Astro JS · Многоязычная архитектура',
      shellHeadline: 'Чистый холст главной страницы',
      shellSubtext: 'Навигационная панель, минималистичная структура страницы и футер настроены. Разделы «Инфо», «Проекты» и «Путь» оставлены чистыми и готовы к заполнению.',
      exploreBlogCta: 'Читать блог',
      infoTitle: '01. Инфо (Info)',
      infoPlaceholder: 'Место для информации о пользователе, профиля и ключевых навыков.',
      projectsTitle: '02. Проекты (Projects)',
      projectsPlaceholder: 'Место для избранных проектов, репозиториев и технических кейсов.',
      journeyTitle: '03. Путь (Journey)',
      journeyPlaceholder: 'Место для этапов карьеры, хронологии и опыта работы.',
      awaitingContentLabel: 'Готово к контенту',
    },
    blog: {
      title: 'Блог и Заметки',
      subtitle: 'Статьи, написанные в формате чистого Markdown и напрямую конвертируемые в семантический HTML с помощью Astro.',
      readArticle: 'Читать статью',
      backToBlog: 'Назад ко всем статьям',
      publishedOn: 'Опубликовано',
      readingTime: 'мин чтения',
      allPostsLabel: 'Все статьи',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: 'Читать эту статью на других языках',
      tableOfContents: 'Содержание',
      copyLink: 'Копировать ссылку',
      copiedLink: 'Ссылка скопирована',
      searchPlaceholder: 'Поиск по заголовку, теме, инструменту или тегам...',
      searchAriaLabel: 'Поиск статей в блоге',
      clearSearch: 'Очистить поиск',
      noResultsTitle: 'Статьи не найдены',
      noResultsHint: 'Попробуйте изменить поисковый запрос или выбрать другую категорию.',
      filterAll: 'Все темы',
      paginationPrev: 'Назад',
      paginationNext: 'Вперед',
      pageOf: 'Страница {current} из {total}',
      showingResults: 'Показано {count} статей',
    },
    footer: {
      rights: 'Все права защищены.',
      seoNote: 'Создано на Astro JS · Встроенный i18n и SEO-оптимизация',
      activeLocaleLabel: 'Язык',
    },
  },
  pt: {
    siteTitle: 'Portfólio & Blog — Edição Minimalista em Astro',
    siteDescription: 'Portfólio multilíngue minimalista e blog em Markdown otimizado para SEO, construído inteiramente com Astro JS em 9 idiomas.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'Início',
      info: 'Info',
      projects: 'Projetos',
      journey: 'Jornada',
      blog: 'Blog',
      languageLabel: 'Selecionar idioma',
    },
    home: {
      shellKicker: 'Astro JS · Arquitetura Multilíngue',
      shellHeadline: 'Tela Inicial Limpa e Minimalista',
      shellSubtext: 'Barra de navegação, corpo estrutural minimalista e rodapé estão configurados. As seções de Info, Projetos e Jornada estão limpas e prontas para o seu conteúdo.',
      exploreBlogCta: 'Ler Artigos do Blog',
      infoTitle: '01. Info',
      infoPlaceholder: 'Espaço reservado para apresentação do usuário, perfil e especialidades.',
      projectsTitle: '02. Projetos',
      projectsPlaceholder: 'Espaço reservado para projetos em destaque, repositórios e estudos de caso.',
      journeyTitle: '03. Jornada',
      journeyPlaceholder: 'Espaço reservado para marcos na carreira, linha do tempo e experiência.',
      awaitingContentLabel: 'Pronto para conteúdo',
    },
    blog: {
      title: 'Blog & Artigos',
      subtitle: 'Artigos escritos em puro Markdown e convertidos diretamente em HTML semântico pelo Astro.',
      readArticle: 'Ler artigo',
      backToBlog: 'Voltar para todos os artigos',
      publishedOn: 'Publicado em',
      readingTime: 'min de leitura',
      allPostsLabel: 'Todos os Artigos',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: 'Ler este artigo em outros idiomas',
      tableOfContents: 'Neste artigo',
      copyLink: 'Copiar link',
      copiedLink: 'Link copiado',
      searchPlaceholder: 'Pesquisar por titulo, tema, ferramenta ou tags...',
      searchAriaLabel: 'Pesquisar artigos do blog',
      clearSearch: 'Limpar busca',
      noResultsTitle: 'Nenhum artigo encontrado',
      noResultsHint: 'Tente ajustar os termos de busca ou selecionar outra categoria.',
      filterAll: 'Todos os topicos',
      paginationPrev: 'Anterior',
      paginationNext: 'Proximo',
      pageOf: 'Pagina {current} de {total}',
      showingResults: 'Exibindo {count} artigos',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      seoNote: 'Construído com Astro JS · i18n Nativo e Otimizado para SEO',
      activeLocaleLabel: 'Idioma',
    },
  },
  tr: {
    siteTitle: 'Portfolyo ve Blog — Minimal Astro Sürümü',
    siteDescription: '9 dilde tamamen Astro JS ile oluşturulmuş minimal, SEO odaklı çok dilli portfolyo ve Markdown blogu.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'Ana Sayfa',
      info: 'Hakkında',
      projects: 'Projeler',
      journey: 'Yolculuk',
      blog: 'Blog',
      languageLabel: 'Dil seçin',
    },
    home: {
      shellKicker: 'Astro JS · Çok Dilli Mimari',
      shellHeadline: 'Temiz Ana Sayfa İskeleti',
      shellSubtext: 'Gezinme çubuğu, minimal gövde düzeni ve alt bilgi yapılandırıldı. Hakkında, Projeler ve Yolculuk bölümleri özel içerikleriniz için temiz bırakıldı.',
      exploreBlogCta: 'Blog Yazılarını Oku',
      infoTitle: '01. Hakkında (Info)',
      infoPlaceholder: 'Kullanıcı tanıtımı, profil detayları ve temel uzmanlıklar için ayrılmış alan.',
      projectsTitle: '02. Projeler (Projects)',
      projectsPlaceholder: 'Öne çıkan vaka çalışmaları, depolar ve teknik projeler için ayrılmış alan.',
      journeyTitle: '03. Yolculuk (Journey)',
      journeyPlaceholder: 'Kariyer dönüm noktaları, zaman çizelgesi ve deneyim için ayrılmış alan.',
      awaitingContentLabel: 'İçerik için hazır',
    },
    blog: {
      title: 'Blog ve Yazılar',
      subtitle: 'Saf Markdown formatında yazılan ve Astro ile doğrudan semantik HTML koduna dönüştürülen makaleler.',
      readArticle: 'Yazıyı oku',
      backToBlog: 'Tüm yazılara dön',
      publishedOn: 'Yayınlanma',
      readingTime: 'dk okuma',
      allPostsLabel: 'Tüm Yazılar',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: 'Bu makaleyi diğer dillerde okuyun',
      tableOfContents: 'Bu sayfada',
      copyLink: 'Bağlantıyı kopyala',
      copiedLink: 'Kopyalandı',
      searchPlaceholder: 'Baslik, konu, arac veya etiketlerle makale arayin...',
      searchAriaLabel: 'Blog makalelerini ara',
      clearSearch: 'Aramayi temizle',
      noResultsTitle: 'Makale bulunamadi',
      noResultsHint: 'Arama terimlerinizi degistirmeyi veya baska bir kategori secmeyi deneyin.',
      filterAll: 'Tum Konular',
      paginationPrev: 'Onceki',
      paginationNext: 'Sonraki',
      pageOf: 'Sayfa {current} / {total}',
      showingResults: '{count} makale gosteriliyor',
    },
    footer: {
      rights: 'Tüm hakları saklıdır.',
      seoNote: 'Astro JS ile geliştirildi · Yerleşik i18n ve SEO Uyumlu',
      activeLocaleLabel: 'Dil',
    },
  },
  fr: {
    siteTitle: 'Portfolio & Blog — Édition Minimale Astro',
    siteDescription: 'Portfolio multilingue minimaliste et blog Markdown optimisé pour le SEO, entièrement conçu avec Astro JS en 9 langues.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'Accueil',
      info: 'Infos',
      projects: 'Projets',
      journey: 'Parcours',
      blog: 'Blog',
      languageLabel: 'Choisir la langue',
    },
    home: {
      shellKicker: 'Astro JS · Architecture Multilingue',
      shellHeadline: 'Canevas d’Accueil Épuré',
      shellSubtext: 'La barre de navigation, le corps minimaliste et le pied de page sont configurés. Les sections Infos, Projets et Parcours sont vierges et prêtes pour votre contenu.',
      exploreBlogCta: 'Lire les Articles du Blog',
      infoTitle: '01. Infos (Info)',
      infoPlaceholder: 'Espace réservé à la présentation, aux informations du profil et aux compétences clés.',
      projectsTitle: '02. Projets (Projects)',
      projectsPlaceholder: 'Espace réservé aux études de cas, dépôts de code et réalisations techniques.',
      journeyTitle: '03. Parcours (Journey)',
      journeyPlaceholder: 'Espace réservé aux étapes clés de carrière, à la chronologie et à l’expérience.',
      awaitingContentLabel: 'Prêt pour le contenu',
    },
    blog: {
      title: 'Blog & Écrits',
      subtitle: 'Articles rédigés en pur Markdown et convertis directement en HTML sémantique grâce à Astro.',
      readArticle: 'Lire l’article',
      backToBlog: 'Retour à tous les articles',
      publishedOn: 'Publié le',
      readingTime: 'min de lecture',
      allPostsLabel: 'Tous les Articles',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: 'Lire cet article dans d’autres langues',
      tableOfContents: 'Sur cette page',
      copyLink: 'Copier le lien',
      copiedLink: 'Lien copié',
      searchPlaceholder: 'Rechercher par titre, sujet, outil ou tags...',
      searchAriaLabel: 'Rechercher des articles',
      clearSearch: 'Effacer la recherche',
      noResultsTitle: 'Aucun article trouve',
      noResultsHint: 'Essayez de modifier vos termes de recherche ou de choisir une autre categorie.',
      filterAll: 'Tous les sujets',
      paginationPrev: 'Precedent',
      paginationNext: 'Suivant',
      pageOf: 'Page {current} sur {total}',
      showingResults: 'Affichage de {count} articles',
    },
    footer: {
      rights: 'Tous droits réservés.',
      seoNote: 'Conçu avec Astro JS · i18n Natif & Optimisé SEO',
      activeLocaleLabel: 'Langue',
    },
  },
  es: {
    siteTitle: 'Portafolio y Blog — Edición Minimalista en Astro',
    siteDescription: 'Portafolio multilingüe minimalista y blog en Markdown optimizado para SEO, creado íntegramente con Astro JS en 9 idiomas.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'Inicio',
      info: 'Info',
      projects: 'Proyectos',
      journey: 'Trayectoria',
      blog: 'Blog',
      languageLabel: 'Seleccionar idioma',
    },
    home: {
      shellKicker: 'Astro JS · Arquitectura Multilingüe',
      shellHeadline: 'Lienzo de Inicio Minimalista',
      shellSubtext: 'La barra de navegación, la estructura principal y el pie de página están listos. Las secciones de Info, Proyectos y Trayectoria se mantienen limpias para tu contenido.',
      exploreBlogCta: 'Leer Artículos del Blog',
      infoTitle: '01. Info',
      infoPlaceholder: 'Espacio reservado para la información del usuario, perfil y especialidades.',
      projectsTitle: '02. Proyectos',
      projectsPlaceholder: 'Espacio reservado para proyectos destacados, repositorios y casos de estudio.',
      journeyTitle: '03. Trayectoria',
      journeyPlaceholder: 'Espacio reservado para hitos profesionales, línea de tiempo y experiencia.',
      awaitingContentLabel: 'Listo para contenido',
    },
    blog: {
      title: 'Blog y Artículos',
      subtitle: 'Artículos escritos en formato Markdown puro y convertidos directamente a HTML semántico mediante Astro.',
      readArticle: 'Leer artículo',
      backToBlog: 'Volver a todos los artículos',
      publishedOn: 'Publicado el',
      readingTime: 'min de lectura',
      allPostsLabel: 'Todos los Artículos',
      markdownBadge: 'Markdown → HTML',
      availableLanguages: 'Leer este artículo en otros idiomas',
      tableOfContents: 'En esta página',
      copyLink: 'Copiar enlace',
      copiedLink: 'Enlace copiado',
      searchPlaceholder: 'Buscar por titulo, tema, herramienta o etiquetas...',
      searchAriaLabel: 'Buscar articulos del blog',
      clearSearch: 'Limpiar busqueda',
      noResultsTitle: 'No se encontraron articulos',
      noResultsHint: 'Intenta ajustar los terminos de busqueda o selecciona otra categoria.',
      filterAll: 'Todos los temas',
      paginationPrev: 'Anterior',
      paginationNext: 'Siguiente',
      pageOf: 'Pagina {current} de {total}',
      showingResults: 'Mostrando {count} articulos',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      seoNote: 'Desarrollado con Astro JS · i18n Nativo y Optimizado para SEO',
      activeLocaleLabel: 'Idioma',
    },
  },
  mr: {
    siteTitle: 'गिरीश लाडे — UI/UX डिझायनर आणि फुल-स्टॅक इंजिनिअर',
    siteDescription: 'प्रायव्हसी-फर्स्ट वेब टूल्स, ब्राउझर आयडीई, क्लायंट-साइड प्रोसेसिंग आणि आधुनिक सॉफ्टवेअर आर्किटेक्चर.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'मुख्यपृष्ठ',
      info: 'माहिती',
      projects: 'प्रकल्प',
      journey: 'प्रवास',
      blog: 'ब्लॉग',
      languageLabel: 'भाषा निवडा',
    },
    home: {
      shellKicker: 'अ‍ॅस्ट्रो जेएस · बहुभाषिक आर्किटेक्चर',
      shellHeadline: 'प्रायव्हसी-फर्स्ट वेब इंजिनिअरिंग',
      shellSubtext: 'क्लाउड किंवा सर्व्हरवर डेटा न पाठवता थेट ब्राउझरमध्ये हाय-स्पीड प्रोसेसिंग देणारे आधुनिक डेव्हलपर टूल्स.',
      exploreBlogCta: 'ब्लॉग वाचा',
      infoTitle: '०१. माहिती',
      infoPlaceholder: 'माझा परिचय, तांत्रिक कौशल्ये आणि सॉफ्टवेअर दृष्टिकोन.',
      projectsTitle: '०२. प्रकल्प',
      projectsPlaceholder: 'LadeStack, GB Coder आणि सर्व लाइव्ह टूल्स.',
      journeyTitle: '०३. प्रवास',
      journeyPlaceholder: 'मेकॅनिकल इंजिनिअरिंग ते फुल-स्टॅक सॉफ्टवेअर इंजिनिअरिंगचा प्रवास.',
      awaitingContentLabel: 'सविस्तर माहिती खालील कार्ड्समध्ये उपलब्ध',
    },
    blog: {
      title: 'तांत्रिक ब्लॉग आणि विचार',
      subtitle: 'सॉफ्टवेअर आर्किटेक्चर, ब्राउझर कम्प्युटिंग आणि वेब डेव्हलपमेंटवरील अस्सल तांत्रिक लेख.',
      readArticle: 'लेख वाचा',
      backToBlog: 'सर्व लेखांकडे परत',
      publishedOn: 'प्रसिद्ध केले',
      readingTime: 'मि. वाचन',
      allPostsLabel: 'सर्व लेख',
      markdownBadge: 'मार्कडाउन → एचटीएमएल',
      availableLanguages: 'हा लेख इतर भाषांमध्ये वाचा',
      tableOfContents: 'अनुक्रमणिका',
      copyLink: 'लिंक कॉपी करा',
      copiedLink: 'लिंक कॉपी झाली',
      searchPlaceholder: 'शीर्षक, विषय किंवा टॅगनुसार लेख शोधा...',
      searchAriaLabel: 'ब्लॉग लेख शोधा',
      clearSearch: 'शोध साफ करा',
      noResultsTitle: 'कोणताही लेख सापडला नाही',
      noResultsHint: 'दुसरे शब्द वापरून पहा किंवा वेगळी कॅटेगरी निवडा.',
      filterAll: 'सर्व विषय',
      paginationPrev: 'मागील',
      paginationNext: 'पुढील',
      pageOf: 'पान {current} पैकी {total}',
      showingResults: '{count} लेख दाखवत आहे',
    },
    footer: {
      rights: 'सर्व हक्क राखीव.',
      seoNote: 'अ‍ॅस्ट्रो जेएस सह विकसित · १० भाषांमध्ये नेटिव्ह i18n आणि संपूर्ण SEO ऑप्टिमाइझ्ड',
      activeLocaleLabel: 'सध्याची भाषा',
    },
  },
};

export function isValidLocale(value: string | undefined): value is Locale {
  if (!value) return false;
  return (LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: string | undefined): Locale {
  return isValidLocale(value) ? value : DEFAULT_LOCALE;
}

export function getTranslations(locale: Locale): UIStrings {
  return UI_TRANSLATIONS[locale] ?? UI_TRANSLATIONS[DEFAULT_LOCALE];
}

/**
 * Strips any leading locale segment from a pathname and returns the clean sub-path.
 * E.g. "/ru/blog/template-post" -> "/blog/template-post"
 *      "/jp/" -> "/"
 *      "/en" -> "/"
 */
export function extractSubPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length === 0) {
    return '/';
  }
  if (isValidLocale(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return `/${segments.join('/')}`;
}

/**
 * Builds the localized URL path for a target locale while preserving the current page path.
 * E.g. switchLocalePath('/en/blog/template-post', 'jp') -> '/jp/blog/template-post'
 *      switchLocalePath('/ru/', 'en') -> '/en/'
 */
export function switchLocalePath(currentPathname: string, targetLocale: Locale): string {
  const subPath = extractSubPath(currentPathname);
  if (subPath === '/') {
    return `/${targetLocale}/`;
  }
  const cleanSubPath = subPath.replace(/\/+$/, '');
  return `/${targetLocale}${cleanSubPath}`;
}

export interface AlternateLink {
  locale: Locale;
  hreflang: string;
  href: string;
}

/**
 * Generates SEO hreflang alternate links for all 9 supported languages.
 */
export function getAlternateLinks(currentPathname: string, siteOrigin: string): AlternateLink[] {
  const cleanOrigin = siteOrigin.replace(/\/+$/, '');
  return LOCALES.map((locale) => {
    const localizedPath = switchLocalePath(currentPathname, locale);
    return {
      locale,
      hreflang: LOCALE_METADATA[locale].htmlLang,
      href: `${cleanOrigin}${localizedPath}`,
    };
  });
}

/**
 * Browser BCP-47 language tag mapping to website supported locale codes.
 */
export const BROWSER_LOCALE_MAP: Record<string, Locale> = {
  // Japanese
  ja: 'jp',
  jp: 'jp',
  // Russian
  ru: 'ru',
  // Marathi
  mr: 'mr',
  // Korean
  ko: 'ko',
  // Chinese
  zh: 'zh',
  'zh-cn': 'zh',
  'zh-tw': 'zh',
  'zh-hk': 'zh',
  'zh-sg': 'zh',
  'zh-hans': 'zh',
  'zh-hant': 'zh',
  // Portuguese
  pt: 'pt',
  'pt-br': 'pt',
  'pt-pt': 'pt',
  // Turkish
  tr: 'tr',
  // French
  fr: 'fr',
  'fr-fr': 'fr',
  'fr-ca': 'fr',
  // Spanish
  es: 'es',
  'es-es': 'es',
  'es-mx': 'es',
  // English
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
};

/**
 * Resolves a list of browser/system language candidates to a supported website Locale.
 * Priority: 1. Stored manual preference -> 2. Matched browser/OS language -> 3. Default fallback
 */
export function resolveBrowserLocale(
  browserLanguages: readonly string[] | string | undefined,
  savedPreference?: string | null
): Locale {
  if (savedPreference && isValidLocale(savedPreference)) {
    return savedPreference;
  }

  const langs = Array.isArray(browserLanguages)
    ? browserLanguages
    : typeof browserLanguages === 'string'
      ? [browserLanguages]
      : [];

  for (const lang of langs) {
    if (!lang) continue;
    const raw = String(lang).toLowerCase().trim();
    const primary = raw.split(/[-_]/)[0];
    const candidate = BROWSER_LOCALE_MAP[raw] || BROWSER_LOCALE_MAP[primary];
    if (candidate && isValidLocale(candidate)) {
      return candidate;
    }
  }

  return DEFAULT_LOCALE;
}
