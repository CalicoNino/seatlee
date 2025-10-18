import js from "@eslint/js"
import * as tseslint from "typescript-eslint"
import reactPlugin from "eslint-plugin-react"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

export default [
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      "dist",
      "build",
      "coverage",
      "bun.lockb",
      "commitlint.config.cjs",
      ".prettierrc.cjs",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: false,
          singleQuote: false,
          trailingComma: "all",
          printWidth: 100,
          tabWidth: 2,
          endOfLine: "auto",
        },
      ],
      "react/react-in-jsx-scope": "off",
      // "tailwindcss/classnames-order": "warn",
      // "tailwindcss/no-custom-classname": "off",
    },
  },
  prettierConfig,
]
