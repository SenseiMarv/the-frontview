export function postFrontmatterRemarkPlugin() {
  return (tree, file) => {
    file.data.astro.frontmatter.layout = "../../../layouts/Post.astro";
  };
}
