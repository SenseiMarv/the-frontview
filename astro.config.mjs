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

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    react(),
    image(),
    mdx(),
    tailwind(),
    compress(),
    prefetch(),
    partytown(),
    sitemap(),
  ],
});
