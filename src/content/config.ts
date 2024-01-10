import type { MarkdownHeading, MarkdownInstance } from "astro";
// eslint-disable-next-line import/no-unresolved
import { type CollectionEntry, defineCollection, z } from "astro:content";

const sharedCollectionSchema = z.object({
  draft: z.boolean().optional(),
  title: z.string(),
  description: z.string(),
  pubDate: z.string(),
  upDate: z.string().optional(),
  customData: z.string().optional(),
});

const postsCollectionSchema = sharedCollectionSchema.merge(
  z.object({
    tags: z.string(),
    cover: z.string(),
    coverAuthor: z.string().optional(),
    coverAuthorUrl: z.string().optional(),
  }),
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

const learnedCollectionSchema = sharedCollectionSchema.merge(
  z.object({
    tags: z.string(),
  }),
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

const setupCollectionSchema = sharedCollectionSchema;

export type SetupCollection = Omit<CollectionEntry<"setup">, "data"> & {
  data: z.infer<typeof setupCollectionSchema>;
};

export interface RenderedSetupCollection {
  Content: MarkdownInstance<Record<string, unknown>>["Content"];
  headings: MarkdownHeading[];
  remarkPluginFrontmatter: {
    readingTime: number;
  };
}

const setupCollection = defineCollection({
  schema: setupCollectionSchema,
});

export const collections = {
  posts: postsCollection,
  learned: learnedCollection,
  setup: setupCollection,
};
