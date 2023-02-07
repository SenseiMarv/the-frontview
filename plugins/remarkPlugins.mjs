import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function postReadingTimePlugin() {
  return (tree, file) => {
    const { frontmatter } = file.data.astro;
    if (!frontmatter.readingTime) {
      const textOnPage = toString(tree);
      // @ts-ignore
      const readingTime = getReadingTime(textOnPage);
      frontmatter.readingTime = readingTime.minutes;
    }
  };
}
