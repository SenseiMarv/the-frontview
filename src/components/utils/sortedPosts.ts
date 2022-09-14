import { compareDesc } from "date-fns";

import type { Post } from "../../typings/Post";

export const sortPostsByDate = (posts: Post[]) =>
  posts.sort((postA, postB) =>
    compareDesc(
      new Date(postA.frontmatter.date),
      new Date(postB.frontmatter.date)
    )
  );
