import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import compressor from "astro-compressor";
import robotsTxt from "astro-robots-txt";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { s } from "hastscript";
import { extname, join } from "path";
import rehypeAddClasses from "rehype-add-classes";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeWrap from "rehype-wrap";
import remarkHint from "remark-hint";
import shikiTwoslash from "remark-shiki-twoslash";
import remarkToc from "remark-toc";

import { postReadingTimePlugin } from "./plugins/remarkPlugins.mjs";

const hostedSiteUrl = "https://www.the-frontview.dev/";

/**
 * Returns the URLs of all tag pages by reading the content directory and extracting the tags from the frontmatter of each MDX file.
 */
const getTagPages = () => {
  const contentDir = join(process.cwd(), "src", "content");
  const subDirs = readdirSync(contentDir, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  /** @type Set<string> */
  const tagPages = new Set();

  subDirs.forEach((subDir) => {
    const files = readdirSync(join(contentDir, subDir), {
      withFileTypes: true,
    });
    const mdxFiles = files.filter(
      (file) => file.isFile() && extname(file.name) === ".mdx",
    );

    mdxFiles.forEach((file) => {
      const fileContent = readFileSync(
        join(contentDir, subDir, file.name),
        "utf-8",
      );
      const { data } = matter(fileContent);

      /** @type string | undefined */
      const dataTags = data.tags;

      if (dataTags) {
        const tags = dataTags.split(/,\s*/);

        tags.forEach((tag) => tagPages.add(`${hostedSiteUrl}tags/${tag}/`));
      }
    });
  });

  return tagPages;
};

const config = defineConfig({
  output: "server",
  adapter: vercel({
    functionPerRoute: false, // Has to be set to false because more than 12 functions would be generated otherwise, which exceeds the Vercel limit
    speedInsights: {
      enabled: true,
    },
  }),
  site: hostedSiteUrl,
  integrations: [
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
              s(`use`, { href: `#link-icon` }),
            ),
          },
        ],
        [rehypeAddClasses, { "h1,h2,h3,h4,h5,h6": "heading" }],
        [
          rehypeWrap,
          {
            selector: "table",
            wrapper: "div.table-container",
            fallback: false,
          },
        ],
      ],
      remarkPlugins: [
        postReadingTimePlugin,
        remarkToc,
        [shikiTwoslash.default, { theme: "one-dark-pro" }],
        remarkHint,
      ],
    }),
    tailwind(),
    prefetch(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    sitemap({
      customPages: [
        // Include the RSS feed page URL as it must appear, without the trailing slash
        `${hostedSiteUrl}rss.xml`,
        ...getTagPages(),
      ],
      filter: (page) =>
        ![
          // Exclude the demo blog post page, as it should not be exposed
          "https://www.the-frontview.dev/posts/demo/",
          // Exclude the auto generated RSS feed page URL, as it must not have a trailing slash
          "https://www.the-frontview.dev/rss.xml/",
        ].includes(page),
    }),
    robotsTxt(),
    compress(), // Should be set one before the last for best results
    compressor(), // Should be set last for best results
  ],
});

export default config;
