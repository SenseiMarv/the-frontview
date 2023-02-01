import image from "@astrojs/image";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import { s } from "hastscript";
import rehypeAddClasses from "rehype-add-classes";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeWrap from "rehype-wrap";
import remarkHint from "remark-hint";
import shikiTwoslash from "remark-shiki-twoslash";
import remarkToc from "remark-toc";

import { postReadingTimePlugin } from "./plugins/remarkPlugins.mjs";

const hostedSiteUrl = "https://www.the-frontview.dev/";

const getSSRSitemapPages = () => [
  `${hostedSiteUrl}tags/`,
  `${hostedSiteUrl}rss.xml`,
];

export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: hostedSiteUrl,
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        rehypeHeadingIds, // Has to be set before plugins that rely on added heading IDs!
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
        [rehypeWrap, { selector: "table", wrapper: "div.table-container" }],
      ],
      remarkPlugins: [
        postReadingTimePlugin,
        remarkToc,
        [shikiTwoslash.default, { theme: "one-dark-pro" }],
        remarkHint,
      ],
    }),
    tailwind(),
    compress(),
    prefetch(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    sitemap({
      // Custom sitemap generation currently doesn't work with SSR, so SSR rendered pages have to be defined
      // manually (tags pages are missing at the moment): https://github.com/withastro/astro/issues/3682
      customPages: getSSRSitemapPages(),
      // Exclude the demo blog post page, as it should not be exposed
      filter: (page) => page !== "https://www.the-frontview.dev/posts/demo/",
    }),
    robotsTxt(),
  ],
});
