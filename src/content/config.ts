// eslint-disable-next-line import/no-unresolved
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

export const collections = {
  posts: postsCollection,
};
