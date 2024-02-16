/** @type {import("eslint").Linter.BaseConfig} */
const config = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'prettier' // Has to be set last!
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  plugins: [
    'import',
    'promise',
    'jsx-a11y',
    'tailwindcss',
    'simple-import-sort'
  ],
  rules: {
    'tailwindcss/no-custom-classname': 'off', // Has to be disabled because the usage of tailwindcss plugins triggers this rule
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
};

config.overrides?.push({
  files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  extends: ['standard-with-typescript', ...(config.extends ?? [])],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
});

config.overrides?.push({
  files: ['*.astro'],
  extends: [
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'standard-with-typescript',
    ...(config.extends ?? [])
  ],
  parser: 'astro-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.astro']
  },
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
});

config.overrides?.push({
  files: ['*.mdx'],
  extends: ['plugin:mdx/recommended', ...(config.extends ?? [])],
  rules: {
    // Not all imported components are always used in the posts
    'no-unused-vars': 'off'
  }
});

module.exports = config;
