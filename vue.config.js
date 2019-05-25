const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: './',
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
      config.plugins.push(new HtmlWebpackPlugin({
        title: '可米彩票',
        filename: 'index.html',
        template: './src/index.html'
      }))
      //这部分代码就是我们要从bundle中导出来的依赖
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': "ELEMENT",
        'axios': 'axios',
      }
    }
  }
}