import { compareDesc } from "date-fns";

import type { Post } from "../../typings/Post";

export const sortPostsByDate = (posts: Post[]) => {
  // `sort()` mutates the original array, so it should be called on a clone
  const arr = posts;
  return arr.sort((olderPost, newerPost) =>
    compareDesc(
      new Date(olderPost.frontmatter.pubDate),
      new Date(newerPost.frontmatter.pubDate)
    )
  );
};
