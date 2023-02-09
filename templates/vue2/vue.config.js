/*
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2022-12-16 16:55:56
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-09 11:10:39
 * @Description: 配置文件
 */
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
let { version, openGzip } = require('./package.json')
version = version.replace(/\./g, '_')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        additionalData: `@import '@/styles/variable.less';`,
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('components', path.join(__dirname, 'src/components'))
      .set('views', path.join(__dirname, 'src/views'))
      .set('assets', path.join(__dirname, 'src/assets'))
      .set('utils', path.join(__dirname, 'src/utils'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://101.132.192.229:6767/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      //为生产环境修改配置
      config.mode = 'production'
      let optimization = {
        minimizer: [
          ...config.optimization.minimizer,
          new UglifyPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: true,
              }
            }
          })
        ]
      }
      //将每个依赖包打包成单独的JS文件
      Object.assign(config, {
        output: {
          ...config.output,
          filename: `static/js/[name].[chunkhash].${version}.js`,
          chunkFilename: `static/js/[name].[chunkhash].${version}.js`
        },
        optimization,
        plugins: [
          ...config.plugins
        ]
      })
      if (openGzip) {
        config.plugins = [
          ...config.plugins,
          new CompressionPlugin({
            test: /\.(js|css|html)$/,// 匹配文件名
            threshold: 0, //对超过10K的数据压缩
            // minRatio: 1, // 压缩率小于1才会压缩
            deleteOriginalAssets: false //不删除源文件
          })
        ]
      }
    } else {
      //为开发环境修改配置
      config.mode = 'development'
    }
    Object.assign(config, {
      plugins: [...config.plugins]
    })
  }
})
