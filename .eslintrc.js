module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:promise/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "standard-with-typescript",
    "prettier", // Has to be set last!
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        project: "./tsconfig.json",
      },
      rules: {},
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "react",
    "import",
    "promise",
    "jsx-a11y",
    "tailwindcss",
    "simple-import-sort",
    "prettier",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
