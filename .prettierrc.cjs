const config = {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss", // Has to be set last!
  ],
  pluginSearchDirs: false, // Has to be disabled due to issues with the tailwind plugin: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  tailwindConfig: "./tailwind.config.cjs",
};

module.exports = config;
