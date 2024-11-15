module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-unused-expressions": 1,
    "curly": 1,
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        "selector": "function",
        "format": ["PascalCase", "camelCase"]
      }
    ],
    "semi": 1,
    "eqeqeq": 1,
    "indent": [1, 2],
    "no-debugger": 1,
    "@typescript-eslint/quotes": [1, "single"],
    "no-trailing-spaces": 1,
    "sort-imports": [1, { "allowSeparatedGroups": true }],
    "linebreak-style": [1, "windows"],
    "no-multiple-empty-lines": 1,
    "no-console": 1,
    "func-style": [
      1,
      "expression",
      { "allowArrowFunctions": true }
    ],
    "max-len": 1,
    "no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression[callee.name='useEffect'][arguments.length!=2]",
        message: "useLayoutEffect must always be invoked with two arguments.",
      },
    ],
  },
}
