import rss from "@astrojs/rss";
// eslint-disable-next-line import/no-unresolved
import { getCollection } from "astro:content";
import { compareDesc } from "date-fns";

// @ts-expect-error Ignore 'Relative import paths need explicit file extensions in EcmaScript imports' to avoid getting a 'Could not import' error
import { getLiveLearned } from "../components/learned/filterLearned";
// @ts-expect-error Ignore 'Relative import paths need explicit file extensions in EcmaScript imports' to avoid getting a 'Could not import' error
import { getLivePosts } from "../components/posts/filterPosts";
// @ts-expect-error Ignore 'Relative import paths need explicit file extensions in EcmaScript imports' to avoid getting a 'Could not import' error
import { getLiveSetup } from "../components/setup/filterSetup";

const title = "The Frontview";
const description =
  "A small personal blog about everything around tech and programming.";
const postDescriptionAddition = "Read the full blog post on the website.";
const learnedDescriptionAddition =
  "Read the full Today I Learned article on the website.";
const setupDescriptionAddition =
  "Read the full My Setup article on the website.";

export const get = async (context) => {
  const posts = getLivePosts(await getCollection("posts"));
  const learned = getLiveLearned(await getCollection("learned"));
  const setup = getLiveSetup(await getCollection("setup"));

  const postItems = posts.map((post) => ({
    title: post.data.title,
    pubDate: new Date(post.data.pubDate),
    description: `${post.data.description}\n\n${postDescriptionAddition}`,
    categories: post.data.tags.split(", "),
    customData: post.data.customData,
    author: "marv.stickel@gmail.com (Marvin Stickel)",
    link: `/posts/${post.slug}/`,
  }));
  const learnedItems = learned.map((learning) => ({
    title: `Today I Learned: ${learning.data.title}`,
    pubDate: new Date(learning.data.pubDate),
    description: `${learning.data.description}\n\n${learnedDescriptionAddition}`,
    categories: learning.data.tags.split(", "),
    customData: learning.data.customData,
    author: "marv.stickel@gmail.com (Marvin Stickel)",
    link: `/learned/${learning.slug}/`,
  }));
  const setupItems = setup.map((setup) => ({
    title: `My Setup: ${setup.data.title}`,
    pubDate: new Date(setup.data.pubDate),
    description: `${setup.data.description}\n\n${setupDescriptionAddition}`,
    categories: ["setup"],
    customData: setup.data.customData,
    author: "marv.stickel@gmail.com (Marvin Stickel)",
    link: `/setup/${setup.slug}/`,
  }));
  const items = [...postItems, ...learnedItems, ...setupItems];
  const sortedItems = items; // `sort()` mutates the original array, so it should be called on a clone
  sortedItems.sort((olderItem, newerItem) => {
    return compareDesc(
      new Date(olderItem.pubDate),
      new Date(newerItem.pubDate),
    );
  });

  return await rss({
    title,
    description,
    site: context.site,
    items: sortedItems,
    stylesheet: "/rss/styles.xsl",
  });
};
