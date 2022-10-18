const config = {
  astroAllowShorthand: false, // Disable the shorthand due to this bug: https://github.com/withastro/language-tools/issues/225
  tailwindConfig: "./tailwind.config.cjs",
};

module.exports = config;
