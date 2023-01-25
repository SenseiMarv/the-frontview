import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function postFrontmatterPlugin() {
  return (tree, file) => {
    const { frontmatter } = file.data.astro;
    if (!frontmatter.layout) {
      const relativeFileLocationFromSrc = file.history[0].split("src/").pop();
      const parentFolderCount = relativeFileLocationFromSrc.match(/\//g).length;
      frontmatter.layout = `${"../".repeat(
        parentFolderCount
      )}layouts/Post.astro`;
    }
  };
}

export function postReadingTimePlugin() {
  return (tree, file) => {
    const { frontmatter } = file.data.astro;
    if (!frontmatter.readingTime) {
      const textOnPage = toString(tree);
      const readingTime = getReadingTime(textOnPage);
      frontmatter.readingTime = readingTime.minutes;
    }
  };
}
