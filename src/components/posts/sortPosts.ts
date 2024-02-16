import { compareDesc } from 'date-fns';

import type { PostsCollection } from '../../content/config';

export const sortPostsByDate = (posts: PostsCollection[]) => {
  // `sort()` mutates the original array, so it should be called on a clone
  const arr = posts;
  return arr.sort((olderPost, newerPost) =>
    compareDesc(
      new Date(olderPost.data.pubDate),
      new Date(newerPost.data.pubDate)
    )
  );
};
