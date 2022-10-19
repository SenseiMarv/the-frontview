import { readdirSync } from "node:fs";

// eslint-disable-next-line import/no-unresolved
import image from "@astrojs/image";
// eslint-disable-next-line import/no-unresolved
import mdx from "@astrojs/mdx";
// eslint-disable-next-line import/no-unresolved
import partytown from "@astrojs/partytown";
// eslint-disable-next-line import/no-unresolved
import prefetch from "@astrojs/prefetch";
// eslint-disable-next-line import/no-unresolved
import sitemap from "@astrojs/sitemap";
// eslint-disable-next-line import/no-unresolved
import tailwind from "@astrojs/tailwind";
// eslint-disable-next-line import/no-unresolved
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
// eslint-disable-next-line import/no-unresolved
import embed from "astro-embed/integration";
// eslint-disable-next-line import/no-unresolved
import robotsTxt from "astro-robots-txt";
import { s } from "hastscript";
import rehypeAddClasses from "rehype-add-classes";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkHint from "remark-hint";
import shikiTwoslash from "remark-shiki-twoslash";
import remarkToc from "remark-toc";

import {
  postFrontmatterPlugin,
  postReadingTimePlugin,
} from "./plugins/remarkPlugins.mjs";

const hostedSiteUrl = "https://the-frontview.vercel.app";

const getSubdirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => `${hostedSiteUrl}/posts/${dirent.name}`);

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
    syntaxHighlight: false,
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
    remarkPlugins: [
      postFrontmatterPlugin,
      postReadingTimePlugin,
      remarkToc,
      [shikiTwoslash.default, { theme: "one-dark-pro" }],
      remarkHint,
    ],
    extendDefaultPlugins: true,
  },
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    embed(),
    mdx(),
    tailwind(),
    compress(),
    prefetch(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    sitemap({
      // Custom sitemap generation currently doesn't work with SSR, so the pages have to be defined
      // manually (tags pages are missing at the moment): https://github.com/withastro/astro/issues/3682
      customPages: [
        hostedSiteUrl,
        `${hostedSiteUrl}/posts`,
        `${hostedSiteUrl}/tags`,
        `${hostedSiteUrl}/rss.xml`,
        ...getSubdirectories("./src/pages/posts"),
      ],
    }),
    robotsTxt(),
  ],
});
