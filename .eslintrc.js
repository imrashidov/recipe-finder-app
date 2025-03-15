module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/no-unescaped-entities": "off",
  },
};
