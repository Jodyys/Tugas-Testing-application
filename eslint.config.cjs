// eslint.config.js (ESM)

const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  eslintrc: true
});

module.exports = [
  js.configs.recommended,

  ...compat.config({
    env: {
      es2021: true,
      node: true,
      jest: true
    },
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": "off",
      "eqeqeq": ["error", "always"]
    }
  }),

  // Konfigurasi khusus untuk script k6 (agar __ENV tidak error dan no-redeclare dimatikan)
  {
    files: ["loadtest/**/*.js"],
    languageOptions: {
      globals: {
        __ENV: "readonly"
      }
    },
    rules: {
      "no-redeclare": "off"
    }
  }
];

