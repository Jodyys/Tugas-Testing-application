// eslint.config.js (ESM)

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  eslintrc: true
});

export default [
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

  // Konfigurasi khusus untuk script k6 (agar __ENV tidak error)
  {
    files: ["loadtest/**/*.js"],
    languageOptions: {
      globals: {
        __ENV: "readonly"
      }
    }
  }
];

