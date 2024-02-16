import { isBefore } from 'date-fns';

import type { PostsCollection } from '../../content/config';

/**
 * Filter posts to show only posts that are not in draft status and have a pubDate before the current date
 */
export const getLivePosts = (posts: PostsCollection[]) =>
  posts.filter(
    (post) =>
      post.data.draft === undefined &&
      isBefore(new Date(post.data.pubDate), new Date())
  );
