module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    indent: [2, "tab"],
    "no-tabs": 0,
    "no-control-regex": 0,
    "vue/html-indent": "off",
    "css/css-semicolonexpected": "off",
    "vue/html-self-closing": "off",
    "vue/comment-directive": "off"
  }
}
