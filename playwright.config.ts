import { defineConfig, devices } from "@playwright/test";

const config = defineConfig({
  testMatch: "__checks__/*.check.js",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

export default config;
