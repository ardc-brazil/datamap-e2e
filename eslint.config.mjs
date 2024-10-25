import eslint from "@eslint/js";
import playwright from 'eslint-plugin-playwright';
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  playwright.configs['flat/recommended'],
  {
    // define TS project config to enable "linting with type information"
    languageOptions: {
      parserOptions: {
        // reuse the existing `tsconfig.json`
        project: true,
        tsconfigRootDir: ".",
      },
    },
    files: ['**/*.{ts,mts,cts}'],

    // enable linting rules beneficial for Playwright projects
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
    },
  }
);