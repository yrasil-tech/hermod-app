import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next',
      'prettier',
      'next/typescript',
      'plugin:@next/next/recommended',
      // "plugin:jsx-a11y/recommended",
    ],
  }),
];

export default eslintConfig;
