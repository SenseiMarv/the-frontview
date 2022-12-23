import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function postFrontmatterPlugin() {
  return (tree, file) => {
    const relativeFileLocationFromSrc = file.history[0].split("src/").pop();
    const parentFolderCount = relativeFileLocationFromSrc.match(/\//g).length;
    file.data.astro.frontmatter.layout = `${"../".repeat(
      parentFolderCount
    )}layouts/Post.astro`;
  };
}

export function postReadingTimePlugin() {
  return (tree, { data }) => {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.readingTime = readingTime.minutes;
  };
}
