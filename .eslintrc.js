module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "max-len": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
  },
};
