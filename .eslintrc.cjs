const config = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "plugin:import/recommended",
    "plugin:promise/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "standard-with-typescript",
    "prettier", // Has to be set last!
  ],
  /** @type any[] */ overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
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
  },
});

config.overrides.push({
  files: ["*.mdx"],
  extends: [...config.extends, "plugin:mdx/recommended"],
  rules: {
    // Not all imported components are always used in the posts
    "no-unused-vars": "off",
    // Disable a false-positive error in the astro-embed plugin
    "import/namespace": "off",
  },
});

module.exports = config;
