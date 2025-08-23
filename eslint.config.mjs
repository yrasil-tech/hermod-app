import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      // 'next/core-web-vitals',
      "next",
      "prettier",
      "plugin:@next/next/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["@typescript-eslint"],
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General rules
      "no-console": "off",
      "no-debugger": "warn",
      "no-unused-vars": "off", // Using TypeScript version
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],

      // React rules - React 19 compatible
      "react/no-unescaped-entities": "off",
    },
    env: {
      browser: true,
      node: true,
      es2022: true,
    },
  }),
];

export default eslintConfig;
