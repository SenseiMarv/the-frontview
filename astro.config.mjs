import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import { s } from "hastscript";
import rehypeAddClasses from "rehype-add-classes";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "remark-toc";

import {
  postFrontmatterPlugin,
  postReadingTimePlugin,
} from "./plugins/remarkPlugins.mjs";

const hostedSiteUrl = "https://the-frontview.vercel.app";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: hostedSiteUrl,
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      rehypePlugins: [
        [
          rehypeAutolinkHeadings,
          {
            content: s(
              `svg`,
              { width: 30, height: 30, viewBox: `0 0 30 30` },
              s(`use`, { href: `#link-icon` })
            ),
          },
        ],
        [rehypeAddClasses, { "h1,h2,h3,h4,h5,h6": "heading" }],
      ],
      remarkPlugins: [postFrontmatterPlugin, postReadingTimePlugin, remarkToc],
    }),
    tailwind(),
    compress(),
    prefetch(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    sitemap({
      customPages: [`${hostedSiteUrl}/posts`, `${hostedSiteUrl}/tags`], // Custom sitemap generation currently doesn't work with SSR, so the pages have to be defined manually: https://github.com/withastro/astro/issues/3682
    }),
  ],
});
