/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  trailingComma: 'none',
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss' // Has to be set last!
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
  tailwindConfig: './tailwind.config.cjs'
};

module.exports = config;
