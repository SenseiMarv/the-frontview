import type { MDXInstance } from "astro";

export declare type Post = MDXInstance<{
  draft?: boolean;
  title: string;
  description: string;
  pubDate: string;
  tags: string;
  imgUrl: string;
  imgAuthor: string;
  imgAuthorUrl: string;
  layout?: string;
  readingTime?: number;
}>;
