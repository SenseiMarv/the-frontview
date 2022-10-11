import type { Post } from "../../typings/Post";
import type { CountedTag, SortedTags } from "../../typings/Tag";

export const getTags = (tags: string): string[] => tags.split(/,\s*/);

export const sortTagsByUsage = (posts: Post[]): SortedTags => {
  const rawTags = posts.flatMap((post) => getTags(post.frontmatter.tags));

  let tags = {};
  rawTags.forEach((tag) => {
    if (tags[tag] === undefined) {
      tags = { ...tags, [tag]: 1 };
    } else {
      tags[tag]++;
    }
  });

  return Object.entries(tags).sort(
    (a: CountedTag, b: CountedTag) => b[1] - a[1]
  ) as SortedTags;
};
