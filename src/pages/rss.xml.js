import rss from "@astrojs/rss";
// eslint-disable-next-line import/no-unresolved
import { getCollection } from "astro:content";

// @ts-ignore
import { getLivePosts } from "../components/posts/filterPosts";

const title = "The Frontview";
const description =
  "A small personal blog about everything around tech and programming. Author: Marvin Stickel";
const postDescriptionAddition = "Read the full blog post on the website.";

export const get = async (context) => {
  const posts = getLivePosts(await getCollection("posts"));

  return rss({
    title,
    description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate),
      description: `${post.data.description}\n\n${postDescriptionAddition}`,
      customData: post.data.customData,
      link: `/posts/${post.slug}/`,
    })),
    stylesheet: "/rss/styles.xsl",
  });
};
