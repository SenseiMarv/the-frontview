import type { MDXInstance } from "astro";
import { OGImageRoute } from "astro-og-canvas";
import defaultTheme from "tailwindcss/defaultTheme.js";

import type { PostData } from "../../content/config.js";

export const { getStaticPaths, get } = OGImageRoute({
  param: "path",
  pages: await import.meta.glob("/src/content/posts/*.mdx", { eager: true }),
  getImageOptions: (_: any, page: MDXInstance<PostData>) => ({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    logo: {
      path: "./public/android-chrome-512x512.png",
    },
    bgGradient: [[72, 167, 154]],
    border: { color: [72, 167, 154], width: 20, side: "inline-start" },
    font: {
      title: {
        families: ["Quicksand", ...defaultTheme.fontFamily.sans],
        weight: "ExtraBold",
      },
      description: {
        families: ["Quicksand", ...defaultTheme.fontFamily.sans],
        weight: "Normal",
      },
    },
  }),
});
