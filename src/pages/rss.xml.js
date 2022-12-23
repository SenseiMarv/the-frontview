// eslint-disable-next-line import/no-unresolved
import rss from "@astrojs/rss";

const title = "The Frontview";
const description =
  "A small personal blog about everything around tech and programming. Author: Marvin Stickel";

export const get = () =>
  rss({
    title,
    description,
    site: import.meta.env.SITE,
    items: import.meta.glob("./posts/*.mdx"),
    stylesheet: "/rss/styles.xsl",
  });
