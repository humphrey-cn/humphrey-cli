/*
 * @Author: Humphrey humphre_ch@163.com
 * @Date: 2023-01-29 10:31:37
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-02 14:07:42
 * @Description: 项目配置
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

//这个配置 为了在html中使用 环境变量
const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target]
}

// https://vitejs.dev/config/ 配置文档
export default defineConfig(({ command, mode, ssrBuild }) => {
  let base_config: object = {
    base: './',
    css: {
      preprocessorOptions: {
        less: {
          // 全局导入 less 变量
          additionalData: `@import '@/assets/styles/variable.less';`,
          // 配置全局less变量，不需要在页面单独引入了
          // modifyVars: {
          //   hack: `true; @import (reference) "${path.resolve(
          //     __dirname,
          //     'src/assets/styles/variable.less',
          //   )}";`,
          // },
          // javascriptEnabled: true,
        },
      },
    },
    resolve: {
      //配置文件扩展名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        api: path.resolve(__dirname, 'src/api'),
        assets: path.resolve(__dirname, 'src/assets'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
      extensions: ['.ts', '.js', '.jsx', '.mjs', '.tsx', '.json'],
    },
  }
  let config: object = {}
  if (command === 'serve' || mode === 'development') {
    // 在开发环境中的独有配置
    config = {
      ...base_config,
      plugins: [
        vue(),
        createHtmlPlugin({
          inject: {
            data: {
              title: getViteEnv(mode, 'VITE_APP_TITLE'),
            },
          },
        }),
      ],
      server: {
        proxy: {
          // 代理配置
          '/api': {
            target: 'http://101.132.192.229:6767/',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
          },
        },
      },
    }
  } else if (command === 'build' || mode === 'production') {
    // 在打包环境中的独有配置
    config = {
      ...base_config,
      plugins: [
        vue(),
        visualizer({
          // 打包分析，打包后生成打包预览
          emitFile: false, // 使用emitFile生成文件，简单说，这个属性为true,打包后的分析文件会出现在打包好的文件包下，否则就会在项目目录下
          filename: 'packStats.html', // 生成分析网页文件名
          open: true, // 在默认用户代理中打开生成的文件
          gzipSize: true, // 从源代码中收集 gzip 大小并将其显示在图表中
        }),
        viteCompression({
          // 压缩打包后文件 ------ 此处需要配合 Nginx 配置（https://blog.csdn.net/weixin_42424283/article/details/127728147）
          verbose: true, // 是否在控制台输出压缩结果，默认为 true
          disable: false, // 是否禁用压缩
          threshold: 1, // 启用压缩的文件大小限制，单位是字节，默认为 0，超多这个数值的资源将会被压缩
          algorithm: 'gzip', // 采用的压缩算法，默认是 gzip
          deleteOriginFile: false, // 压缩后是否删除原文件，默认为 false
          ext: '.gz', // 生成的压缩包后缀
        }),
      ],
      build: {
        minify: 'terser', // 打包结果取消minify，方便我们看打包后结果对比
        chunkSizeWarningLimit: 500, // 规定触发警告的 chunk 大小。（以 kbs 为单位） -- 未生效，待研究～～
        reportCompressedSize: true, // 关闭文件计算
        sourcemap: false, // 关闭生成map文件 可以达到缩小打包体积
        terserOptions: {
          compress: {
            //生产环境时移除console和debugger
            drop_console: true,
            drop_debugger: true,
          },
        },
        rollupOptions: {
          output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            manualChunks(id: any) {
              if (id.includes('node_modules')) {
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString()
              }
            },
          },
        },
      },
    }
  }
  return config
})
