import { rssSchema } from "@astrojs/rss";
import type { MarkdownHeading, MarkdownInstance } from "astro";
// eslint-disable-next-line import/no-unresolved
import { type CollectionEntry, defineCollection, z } from "astro:content";

const postsCollectionSchema = rssSchema.merge(
  z.object({
    description: z.string(),
    pubDate: z.string(),
    tags: z.string(),
    imgUrl: z.string(),
    imgAuthor: z.string(),
    imgAuthorUrl: z.string(),
  })
);

export type PostsCollection = Omit<CollectionEntry<"posts">, "data"> & {
  data: z.infer<typeof postsCollectionSchema>;
};

export interface RenderedPostsCollection {
  Content: MarkdownInstance<Record<string, unknown>>["Content"];
  headings: MarkdownHeading[];
  remarkPluginFrontmatter: {
    readingTime: number;
  };
}

const postsCollection = defineCollection({
  schema: postsCollectionSchema,
});

const learnedCollectionSchema = rssSchema.merge(
  z.object({
    description: z.string(),
    pubDate: z.string(),
    tags: z.string(),
  })
);

export type LearnedCollection = Omit<CollectionEntry<"learned">, "data"> & {
  data: z.infer<typeof learnedCollectionSchema>;
};

export interface RenderedLearnedCollection {
  Content: MarkdownInstance<Record<string, unknown>>["Content"];
  headings: MarkdownHeading[];
  remarkPluginFrontmatter: {
    readingTime: number;
  };
}

const learnedCollection = defineCollection({
  schema: learnedCollectionSchema,
});

export const collections = {
  posts: postsCollection,
  learned: learnedCollection,
};
