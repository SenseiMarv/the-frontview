import { compareDesc } from "date-fns";

import type { LearnedCollection } from "../../content/config";

export const sortLearnedByDate = (learned: LearnedCollection[]) => {
  // `sort()` mutates the original array, so it should be called on a clone
  const arr = learned;
  return arr.sort((olderLearning, newerLearning) =>
    compareDesc(
      new Date(olderLearning.data.pubDate),
      new Date(newerLearning.data.pubDate),
    ),
  );
};
