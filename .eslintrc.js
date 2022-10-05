const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:import/recommended",
    "plugin:promise/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "standard-with-typescript",
    "prettier", // Has to be set last!
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "import",
    "promise",
    "jsx-a11y",
    "tailwindcss",
    "simple-import-sort",
    "prettier",
  ],
  rules: {
    "tailwindcss/no-custom-classname": "off", // Has to be disabled because the usage of tailwindcss plugins triggers this rule
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};

config.overrides.push({
  files: ["*.astro"],
  extends: [
    ...config.extends,
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
  ],
  parser: "astro-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".astro"],
    project: "./tsconfig.json",
  },
});

config.overrides.push({
  files: ["*.mdx"],
  extends: [...config.extends, "plugin:mdx/recommended"],
});

module.exports = config;
