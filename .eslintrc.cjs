module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Для TypeScript
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',                  // Базовые правила
    'plugin:@typescript-eslint/recommended', // TypeScript правила
    'plugin:react/recommended',            // React правила
    'plugin:react-hooks/recommended',      // React Hooks
    'plugin:@next/next/recommended',       // Next.js рекомендации
    'plugin:prettier/recommended',         // Prettier
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off', // Next.js это не требует
  },
  settings: {
    react: { version: 'detect' },
  },
  ignorePatterns: ['dist', 'node_modules'],
};