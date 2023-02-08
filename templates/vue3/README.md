<!--
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2023-01-31 14:06:56
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-03 16:36:06
 * @Description: 项目说明文档
-->

# Vue 3 + TypeScript + Vite 构建的基础项目框架

## 项目启动

**node 版本>=18**

```shell
npm install # 安装依赖
npm run dev # 运行项目
npm run build # 打包项目
npm run preview # 运行打包后的项目
```

## 目录结构说明

```
|-- .husky                      husky配置，commit提交格式限制
|-- .vscode                     vscode相关配置
|-- public                      存放项目静态资源文件
|-- src
    |-- api                     存放接口文件
    |   |-- demo.ts             使用示例
    |-- assets                  存在项目资源文件
    |   |-- icons               存放 Icon 文件
    |   |   |-- demo.png
    |   |-- images              存放 Images 文件
    |   |   |-- demo.png
    |   |-- styles              存放 样式 文件
    |   |   |-- base.less       自定义项目基础样式配置
    |   |   |-- index.less      集合导出文件
    |   |   |-- reset.min.css   浏览器差异解决重置样式文件
    |   |   |-- variable.less   存储 less 变量文件
    |   |-- svgs                存放 svg 文件
    |       |-- demo.svg
    |-- components              组件
    |   |-- HelloWorld.vue
    |-- components-global       全局组件（无需在页面手动引入）
    |   |-- index.ts            导出全局公共组件文件
    |   |-- header              具体组件
    |       |-- index.vue       入口文件必需以 index.vue 命名
    |-- router                  路由
    |   |-- index.ts            路由配置文件
    |-- store                   状态管理
    |   |-- index.ts            基础配置文件
    |-- utils                   方法
    |   |-- axiosInstance.ts    axios接口封装
    |   |-- storage.ts          本地存储localStorage/sessionStorage方法优化增强
    |-- views                   页面
        |-- demo                示例
        |   |-- index.vue
    |-- App.vue
    |-- env.d.ts                环境变量类型声明文件
    |-- main.ts                 入口文件
    |-- shims-vue.d.ts
    |-- vite-env.d.ts
    |-- vuex.d.ts               vuex类型声明配置文件
|-- .env                        公共环境变量文件
|-- .env.development            开发环境变量
|-- .env.production             生产环境变量
|-- .gitignore                  git忽略文件
|-- commitlint.config.cjs       commit-lint 配置文件
|-- index.html                  项目根文件
|-- package-lock.json
|-- package.json                依赖
|-- README.md                   项目说明文件
|-- packStats.html              打包后生成的查看包大小页面
|-- tsconfig.json               ts配置文件
|-- tsconfig.node.json
|-- vite.config.ts              vite配置文件
```

## 关于样式

该项目引用的 css 预处理器是 less, 具体使用方法请查看[less 官网](http://lesscss.cn/)

在页面中设置样式时，颜色、字体等，建议都使用`less变量`，less 变量在`src/assets/styles/variable.less`中设置

一些组合样式，如：`button`、清除浮动、字数溢出省略、等，可以在`src/assets/styles/base.less`中设置

## 关于新增路由页面

在`src/views`中新建页面文件夹, 如：home，再在其内部创建 `index.vue` 文件

```vue
<!-- 示例 -->
<template>
  <div class="box">Home页面</div>
  <p>{{ a }}</p>
</template>
<script setup lang="tsx">
const a = '123'
</script>
<style lang="less" scoped>
.box {
  color: @text-color;
}
</style>
```

**挂载路由**，在`src/router/index.ts`中增加配置

```ts
// 路径需要写相对路径
const routes: RouteRecordRaw[] = [
  ...{
    path: '/home',
    name: 'home',
    component: async () =>
      await import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
  },
]
```

## 环境变量

[Vite](https://cn.vitejs.dev/guide/env-and-mode.html) 在一个特殊的 `import.meta.env` 对象上暴露了环境变量。有一些默认的内置变量

```ts
import.meta.env.MODE: {string} 应用运行的模式。
import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由 base 配置项决定。
import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
import.meta.env.SSR: {boolean} 应用是否运行在 server 上。
```

其余环境变量在 `.env` | `.env.*` 中声明定义，使用 `import.meta.env.XXX` 去获取

> 定义的每一个环境变量都需要在 `src/env.d.ts` 中声明一下类型

## 代码提交规范

[Git - Commit message 提交规范](https://blog.csdn.net/weixin_46652769/article/details/128828716)

**Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。**

> Commit message 需要包括三个字段：`type`（必需）、`scope`（可选）和 `subject`（必需）

- type: 用于说明 commit 的类别，只允许使用下面 7 个标识。

  ```
  feat：新功能（feature）
  fix：修补 bug
  docs：文档（documentation）
  style： 格式（不影响代码运行的变动）
  refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
  test：增加测试
  chore：构建过程或辅助工具的变动
  ```

- scope: 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

- subject: 是 commit 目的的简短描述，不超过 50 个字符。

> 还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以 revert: 开头，后面跟着被撤销 Commit message

```shell
# 示例
git commit # 回车
# 进入vi编辑器，可以写多行。
revert: feat(pencil): add xxx
# 空一行
This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```
