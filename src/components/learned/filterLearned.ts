import { isBefore } from "date-fns";

import type { LearnedCollection } from "../../content/config.js";

/**
 * Filter learned to show only learned that are not in draft status and have a pubDate before the current date
 */
export const getLiveLearned = (learned: LearnedCollection[]) =>
  learned.filter(
    (learning) =>
      learning.data.draft === undefined &&
      isBefore(new Date(learning.data.pubDate), new Date())
  );
