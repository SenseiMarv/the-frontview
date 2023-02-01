import type { PostsCollection } from "../../content/config.js";

export const getLivePosts = (posts: PostsCollection[]) =>
  posts.filter((post) => post.data.draft === undefined);
