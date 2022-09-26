export function postFrontmatterPlugin() {
  return (tree, file) => {
    file.data.astro.frontmatter.layout = "../../../layouts/Post.astro";
  };
}
