import js from '@eslint/js';

export default [
  js.configs.all,  // ✅ ALL ESLint rules enabled
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly'
      }
    },
    rules: {
      // Only override specific rules you want to relax
      'no-console': 'warn',  // Instead of error
      'no-magic-numbers': 'off',  // Too strict for most projects
      'one-var': 'off',  // Personal preference
    }
  }
];
