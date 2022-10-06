import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function postFrontmatterPlugin() {
  return (tree, file) => {
    file.data.astro.frontmatter.layout = "../../../layouts/Post.astro";
  };
}

export function postReadingTimePlugin() {
  return (tree, { data }) => {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.readingTime = readingTime.minutes;
  };
}
