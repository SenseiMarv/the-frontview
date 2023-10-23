import type { LearnedCollection, PostsCollection } from "../../content/config";
import type { SortedTags } from "../../typings/Tag";

export const getTags = (tags: string): string[] => tags.split(/,\s*/);

export const sortTagsByUsage = (
  posts: PostsCollection[],
  learned: LearnedCollection[],
): SortedTags => {
  const postTags = posts.flatMap((post) => getTags(post.data.tags));
  const learnedTags = learned.flatMap((learning) =>
    getTags(learning.data.tags),
  );
  const rawTags = postTags.concat(learnedTags);

  let tags: Record<string, number> = {};
  rawTags.forEach((tag) => {
    if (tags[tag] === undefined) {
      tags = { ...tags, [tag]: 1 };
    } else {
      tags[tag]++;
    }
  });

  return Object.entries(tags).sort(
    (lessUsedTag, moreUsedTag) => moreUsedTag[1] - lessUsedTag[1],
  );
};
