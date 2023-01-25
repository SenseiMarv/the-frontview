// eslint-disable-next-line import/no-unresolved
import rss, { pagesGlobToRssItems } from "@astrojs/rss";

const title = "The Frontview";
const description =
  "A small personal blog about everything around tech and programming. Author: Marvin Stickel";

export const get = async (context) =>
  rss({
    title,
    description,
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./posts/*.mdx")),
    stylesheet: "/rss/styles.xsl",
  });
