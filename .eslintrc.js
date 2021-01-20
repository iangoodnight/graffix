module.exports = {
  root: true, // Eslint config at root of directory
  parserOptions: {
    ecmaVersion: 2020, // Use latest version of ecmaScript
    sourceType: 'module', // Allows for import/export statements
    ecmaFeatures: {
      jsx: true, // Enable jsx for React support
    },
  },
  settings: {
    react: {
      version: 'detect', // Detect react version auto-magically
    },
  },
  env: {
    browser: true, // Enable browser globals
    amd: true, // Enable require() and define()
    node: true, // Enable node globals
  },
  plugins: ['simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
