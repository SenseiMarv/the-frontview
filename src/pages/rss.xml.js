import rss from "@astrojs/rss";
// eslint-disable-next-line import/no-unresolved
import { getCollection } from "astro:content";
import { compareDesc } from "date-fns";

// @ts-ignore Ignore 'Relative import paths need explicit file extensions in EcmaScript imports' to avoid getting a 'Could not import' error
import { getLiveLearned } from "../components/learned/filterLearned";
// @ts-ignore Ignore 'Relative import paths need explicit file extensions in EcmaScript imports' to avoid getting a 'Could not import' error
import { getLivePosts } from "../components/posts/filterPosts";

const title = "The Frontview";
const description =
  "A small personal blog about everything around tech and programming.";
const postDescriptionAddition = "Read the full blog post on the website.";
const learnedDescriptionAddition =
  "Read the full Today I Learned article on the website.";

export const get = async (context) => {
  const posts = getLivePosts(await getCollection("posts"));
  const learned = getLiveLearned(await getCollection("learned"));

  const postItems = posts.map((post) => ({
    title: post.data.title,
    pubDate: new Date(post.data.pubDate),
    description: `${post.data.description}\n\n${postDescriptionAddition}`,
    customData: post.data.customData,
    link: `/posts/${post.slug}/`,
  }));
  const learnedItems = learned.map((learning) => ({
    title: `Today I Learned ${learning.data.title}`,
    pubDate: new Date(learning.data.pubDate),
    description: `${learning.data.description}\n\n${learnedDescriptionAddition}`,
    customData: learning.data.customData,
    link: `/learned/${learning.slug}/`,
  }));
  const items = postItems.concat(learnedItems);
  const sortedItems = items.sort((olderItem, newerItem) => {
    return compareDesc(
      new Date(olderItem.pubDate),
      new Date(newerItem.pubDate)
    );
  });

  return rss({
    title,
    description,
    site: context.site,
    items: sortedItems,
    stylesheet: "/rss/styles.xsl",
  });
};
