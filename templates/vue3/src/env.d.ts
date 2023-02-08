/*
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2023-02-02 13:19:23
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-02 13:55:29
 * @Description:
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string // 项目 Title
  readonly VITE_API_BASEURL: string // 接口基础路径
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
