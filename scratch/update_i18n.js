import fs from 'node:fs';

const content = fs.readFileSync('src/i18n/config.ts', 'utf8');
const lines = content.split('\n');

const additions = [
  {
    target: "copiedLink: 'コピーしました',",
    snippet: [
      "      searchPlaceholder: '記事のタイトル、トピック、ツール、タグで検索...',",
      "      searchAriaLabel: 'ブログ記事を検索',",
      "      clearSearch: '検索をクリア',",
      "      noResultsTitle: '記事が見つかりませんでした',",
      "      noResultsHint: '検索キーワードを変更するか、別のカテゴリーを選択してください。',",
      "      filterAll: 'すべてのトピック',",
      "      paginationPrev: '前へ',",
      "      paginationNext: '次へ',",
      "      pageOf: '{total} ページ中 {current} ページ',",
      "      showingResults: '{count} 件の記事を表示中',",
    ],
  },
  {
    target: "copiedLink: '링크 복사됨',",
    snippet: [
      "      searchPlaceholder: '제목, 주제, 도구, 태그로 글 검색...',",
      "      searchAriaLabel: '블로그 글 검색',",
      "      clearSearch: '검색어 지우기',",
      "      noResultsTitle: '기사를 찾을 수 없습니다',",
      "      noResultsHint: '검색어를 조정하거나 다른 카테고리 필터를 선택해 보세요.',",
      "      filterAll: '모든 주제',",
      "      paginationPrev: '이전',",
      "      paginationNext: '다음',",
      "      pageOf: '{total}페이지 중 {current}페이지',",
      "      showingResults: '{count}개의 기사 표시 중',",
    ],
  },
  {
    target: "copiedLink: '已复制链接',",
    snippet: [
      "      searchPlaceholder: '按标题、主题、工具或标签搜索文章...',",
      "      searchAriaLabel: '搜索博客文章',",
      "      clearSearch: '清除搜索',",
      "      noResultsTitle: '未找到相关文章',",
      "      noResultsHint: '请尝试调整搜索词或选择其他分类筛选。',",
      "      filterAll: '全部主题',",
      "      paginationPrev: '上一页',",
      "      paginationNext: '下一页',",
      "      pageOf: '第 {current} 页，共 {total} 页',",
      "      showingResults: '显示 {count} 篇文章',",
    ],
  },
  {
    target: "copiedLink: 'Ссылка скопирована',",
    snippet: [
      "      searchPlaceholder: 'Поиск по заголовку, теме, инструменту или тегам...',",
      "      searchAriaLabel: 'Поиск статей в блоге',",
      "      clearSearch: 'Очистить поиск',",
      "      noResultsTitle: 'Статьи не найдены',",
      "      noResultsHint: 'Попробуйте изменить поисковый запрос или выбрать другую категорию.',",
      "      filterAll: 'Все темы',",
      "      paginationPrev: 'Назад',",
      "      paginationNext: 'Вперед',",
      "      pageOf: 'Страница {current} из {total}',",
      "      showingResults: 'Показано {count} статей',",
    ],
  },
  {
    target: "copiedLink: 'Link copiado',",
    snippet: [
      "      searchPlaceholder: 'Pesquisar por titulo, tema, ferramenta ou tags...',",
      "      searchAriaLabel: 'Pesquisar artigos do blog',",
      "      clearSearch: 'Limpar busca',",
      "      noResultsTitle: 'Nenhum artigo encontrado',",
      "      noResultsHint: 'Tente ajustar os termos de busca ou selecionar outra categoria.',",
      "      filterAll: 'Todos os topicos',",
      "      paginationPrev: 'Anterior',",
      "      paginationNext: 'Proximo',",
      "      pageOf: 'Pagina {current} de {total}',",
      "      showingResults: 'Exibindo {count} artigos',",
    ],
  },
  {
    target: "copiedLink: 'Kopyalandı',",
    snippet: [
      "      searchPlaceholder: 'Baslik, konu, arac veya etiketlerle makale arayin...',",
      "      searchAriaLabel: 'Blog makalelerini ara',",
      "      clearSearch: 'Aramayi temizle',",
      "      noResultsTitle: 'Makale bulunamadi',",
      "      noResultsHint: 'Arama terimlerinizi degistirmeyi veya baska bir kategori secmeyi deneyin.',",
      "      filterAll: 'Tum Konular',",
      "      paginationPrev: 'Onceki',",
      "      paginationNext: 'Sonraki',",
      "      pageOf: 'Sayfa {current} / {total}',",
      "      showingResults: '{count} makale gosteriliyor',",
    ],
  },
  {
    target: "copiedLink: 'Lien copié',",
    snippet: [
      "      searchPlaceholder: 'Rechercher par titre, sujet, outil ou tags...',",
      "      searchAriaLabel: 'Rechercher des articles',",
      "      clearSearch: 'Effacer la recherche',",
      "      noResultsTitle: 'Aucun article trouve',",
      "      noResultsHint: 'Essayez de modifier vos termes de recherche ou de choisir une autre categorie.',",
      "      filterAll: 'Tous les sujets',",
      "      paginationPrev: 'Precedent',",
      "      paginationNext: 'Suivant',",
      "      pageOf: 'Page {current} sur {total}',",
      "      showingResults: 'Affichage de {count} articles',",
    ],
  },
  {
    target: "copiedLink: 'Enlace copiado',",
    snippet: [
      "      searchPlaceholder: 'Buscar por titulo, tema, herramienta o etiquetas...',",
      "      searchAriaLabel: 'Buscar articulos del blog',",
      "      clearSearch: 'Limpiar busqueda',",
      "      noResultsTitle: 'No se encontraron articulos',",
      "      noResultsHint: 'Intenta ajustar los terminos de busqueda o selecciona otra categoria.',",
      "      filterAll: 'Todos los temas',",
      "      paginationPrev: 'Anterior',",
      "      paginationNext: 'Siguiente',",
      "      pageOf: 'Pagina {current} de {total}',",
      "      showingResults: 'Mostrando {count} articulos',",
    ],
  },
];

const newLines = [];
for (const line of lines) {
  newLines.push(line);
  for (const item of additions) {
    if (line.includes(item.target)) {
      newLines.push(...item.snippet);
      console.log('Inserted after:', item.target);
    }
  }
}

fs.writeFileSync('src/i18n/config.ts', newLines.join('\n'), 'utf8');
console.log('Successfully written config.ts');
