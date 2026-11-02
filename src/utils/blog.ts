import type { MarkdownInstance } from 'astro';
import { LOCALES, type Locale } from '../i18n/config';

export interface BlogFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  readingTime: number;
  category: string;
  slug: string;
  lang: Locale;
  tags?: string[];
  tool?: string;
  featured?: boolean;
}

export type BlogMarkdownModule = MarkdownInstance<BlogFrontmatter>;

export interface SearchableBlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  readingTime: number;
  category: string;
  lang: Locale;
  tags: string[];
  tool?: string;
  contentSnippet: string;
}

/**
 * Loads all Markdown files from /src/content/blog/<lang>/*.md
 * Astro compiles these .md files directly into HTML components.
 */
export function getAllMarkdownBlogs(): BlogMarkdownModule[] {
  const modules = import.meta.glob<BlogMarkdownModule>('/src/content/blog/**/*.md', {
    eager: true,
  });
  return Object.values(modules);
}

export function getBlogsByLocale(locale: Locale): BlogMarkdownModule[] {
  return getAllMarkdownBlogs()
    .filter((post) => post.frontmatter.lang === locale)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.pubDate).getTime() -
        new Date(a.frontmatter.pubDate).getTime()
    );
}

export function getSearchableBlogsByLocale(locale: Locale): SearchableBlogPost[] {
  return getBlogsByLocale(locale).map((post) => {
    let raw = '';
    try {
      raw = typeof post.rawContent === 'function' ? post.rawContent() : '';
    } catch {
      raw = '';
    }
    // Clean markdown syntax for search indexing
    const cleanSnippet = raw
      .replace(/#+\s+/g, '')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 500);

    return {
      slug: post.frontmatter.slug,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: post.frontmatter.pubDate,
      readingTime: post.frontmatter.readingTime,
      category: post.frontmatter.category,
      lang: post.frontmatter.lang,
      tags: post.frontmatter.tags || [],
      tool: post.frontmatter.tool,
      contentSnippet: cleanSnippet,
    };
  });
}

export function getBlogByLocaleAndSlug(
  locale: Locale,
  slug: string
): BlogMarkdownModule | undefined {
  return getAllMarkdownBlogs().find(
    (post) => post.frontmatter.lang === locale && post.frontmatter.slug === slug
  );
}

export function getAllLocaleBlogPaths() {
  const allPosts = getAllMarkdownBlogs();
  const paths: Array<{
    params: { lang: Locale; slug: string };
    props: { post: BlogMarkdownModule };
  }> = [];

  for (const locale of LOCALES) {
    const localePosts = allPosts.filter((p) => p.frontmatter.lang === locale);
    for (const post of localePosts) {
      paths.push({
        params: { lang: locale, slug: post.frontmatter.slug },
        props: { post },
      });
    }
  }

  return paths;
}
