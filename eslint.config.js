import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,  // Specifies globals for browser environments
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',  // Specifies ESModules (import/export) syntax
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    env: {
      browser: true,  // Tells ESLint this code runs in a browser environment
      es2020: true,
      node:true  // Tells ESLint that you're using ECMAScript 2020 features
    },
  },
  {
    // Add special handling for tailwind.config.js if you use CommonJS there
    files: ['tailwind.config.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'script',  // Treat tailwind.config.js as a CommonJS script
      },
    },
    rules: {
      // If necessary, turn off certain rules for the config file
      'import/no-commonjs': 'off',  // Allow CommonJS syntax in configuration
    },
    env: {
      node: true,  // Tailwind config typically runs in a Node.js environment
    },
  },
]




