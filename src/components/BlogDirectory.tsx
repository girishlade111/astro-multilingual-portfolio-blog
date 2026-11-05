import React, { useState, useMemo, useRef } from 'react';
import { Search, X, ChevronLeft, ChevronRight, ArrowUpRight, Tag, Wrench, RotateCcw } from 'lucide-react';
import type { SearchableBlogPost } from '../utils/blog';
import type { UIStrings, Locale } from '../i18n/config';

interface BlogDirectoryProps {
  posts: SearchableBlogPost[];
  strings: UIStrings['blog'];
  locale: Locale;
}

const ITEMS_PER_PAGE = 6;

export default function BlogDirectory({ posts, strings, locale }: BlogDirectoryProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract all distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [posts]);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      // Category filter
      if (selectedCategory !== 'all' && post.category !== selectedCategory) {
        return false;
      }

      // If no search query, match
      if (!q) return true;

      // Multi-field search
      const titleMatch = post.title.toLowerCase().includes(q);
      const descMatch = post.description.toLowerCase().includes(q);
      const catMatch = post.category.toLowerCase().includes(q);
      const toolMatch = post.tool ? post.tool.toLowerCase().includes(q) : false;
      const tagMatch = post.tags.some((t) => t.toLowerCase().includes(q));
      const snippetMatch = post.contentSnippet.toLowerCase().includes(q);

      return titleMatch || descMatch || catMatch || toolMatch || tagMatch || snippetMatch;
    });
  }, [posts, query, selectedCategory]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));

  // Current page slice
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setQuery('');
    setCurrentPage(1);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const formatPageOf = (curr: number, total: number) => {
    return strings.pageOf.replace('{current}', String(curr)).replace('{total}', String(total));
  };

  const formatShowingResults = (count: number) => {
    return strings.showingResults.replace('{count}', String(count));
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Universal Search & Category Filter Section */}
      <div className="space-y-4">
        {/* Universal Search Bar */}
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder={strings.searchPlaceholder}
            aria-label={strings.searchAriaLabel}
            className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-zinc-200/90 bg-white/80 backdrop-blur-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100/20 dark:focus:border-zinc-100"
          />
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label={strings.clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills & Result Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Filter articles by category">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200/80 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
              }`}
            >
              {strings.filterAll}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200/80 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            {formatShowingResults(filteredPosts.length)}
          </p>
        </div>
      </div>

      {/* Blog Article Cards List */}
      {paginatedPosts.length > 0 ? (
        <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
          {paginatedPosts.map((post) => {
            const postUrl = `/${locale}/blog/${post.slug}`;
            return (
              <article key={post.slug} className="py-7 sm:py-8 first:pt-2 last:pb-2 group">
                <div className="space-y-3 max-w-3xl">
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium dark:bg-zinc-800 dark:text-zinc-200">
                      {post.category}
                    </span>
                    <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                      /
                    </span>
                    <span>
                      {strings.publishedOn} {post.pubDate}
                    </span>
                    <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                      /
                    </span>
                    <span>
                      {post.readingTime} {strings.readingTime}
                    </span>
                    {post.tool && (
                      <>
                        <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                          /
                        </span>
                        <span className="inline-flex items-center gap-1 text-zinc-700 bg-zinc-100/80 px-1.5 py-0.5 rounded text-[11px] dark:text-zinc-300 dark:bg-zinc-800/80">
                          <Wrench className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                          <span>{post.tool}</span>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-lg sm:text-2xl font-semibold tracking-tight text-zinc-950 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300 transition-colors">
                    <a href={postUrl} className="focus:outline-none block py-0.5">
                      {post.title}
                    </a>
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Tags & Action Link */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    {post.tags && post.tags.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            <Tag className="w-2.5 h-2.5 text-zinc-400" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div />
                    )}

                    <a
                      href={postUrl}
                      className="inline-flex items-center gap-1.5 min-h-[40px] text-xs font-semibold text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300 transition-colors whitespace-nowrap ml-auto"
                    >
                      <span>{strings.readArticle}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50 p-8 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-400 flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{strings.noResultsTitle}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">{strings.noResultsHint}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
              setCurrentPage(1);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{strings.clearSearch}</span>
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80"
        >
          <p className="text-xs font-mono text-zinc-500 order-2 sm:order-1">
            {formatPageOf(currentPage, totalPages)}
          </p>

          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            {/* Previous Page */}
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label={strings.paginationPrev}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{strings.paginationPrev}</span>
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                aria-current={currentPage === pageNum ? 'page' : undefined}
                className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-zinc-900 text-white font-semibold dark:bg-zinc-100 dark:text-zinc-950'
                    : 'bg-white border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Page */}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label={strings.paginationNext}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">{strings.paginationNext}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

