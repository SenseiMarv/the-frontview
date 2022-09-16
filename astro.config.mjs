import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

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
    react(),
    image(),
    mdx(),
    tailwind(),
    compress(),
    prefetch(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    sitemap({
      customPages: [`${hostedSiteUrl}/posts`, `${hostedSiteUrl}/tags`], // Custom sitemap generation currently doesn't work with SSR, so the pages have to be defined manually: https://github.com/withastro/astro/issues/3682
    }),
  ],
});
