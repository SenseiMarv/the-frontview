import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function readingTimePlugin() {
  return (
    /** @type {unknown} */ tree,
    /** @type {{ data: { astro: { frontmatter: Record<string, unknown> }; }; }} */ {
      data,
    },
  ) => {
    const { frontmatter } = data.astro;
    if (frontmatter.readingTime) {
      return;
    }
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    frontmatter.readingTime = readingTime.minutes;
  };
}
