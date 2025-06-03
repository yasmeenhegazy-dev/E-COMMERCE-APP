const { defineConfig } = require("@vue/cli-service");
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js', '.vue', '.json'],
      fallback: {
        "path": false
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        caseSensitive: true
      }))
  }
});
