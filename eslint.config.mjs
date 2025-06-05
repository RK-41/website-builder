import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules', '.next'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ Add this
        },
      },
    },
  },

  js.configs.recommended,
  comments.recommended,
  react,
  prettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },
    },
    rules: {
      'prettier/prettier': 'error',
      // 'react/jsx-uses-react': 'off',// uncomment in future
      'react/react-in-jsx-scope': 'off',
      // 'no-var': 'error', // uncomment in future
      'react/prop-types': 0,
      'no-useless-catch': 'off', //need to be enabled remove this line important
    },
  },
];
