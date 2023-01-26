import type { Post } from "../../typings/Post.js";

export const getLivePosts = (posts: Post[]) =>
  posts.filter((post) => post.frontmatter.draft === undefined);
