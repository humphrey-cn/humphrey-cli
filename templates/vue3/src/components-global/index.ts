import { DefineComponent } from 'vue'
/*
 * @Author: Humphrey humphre_ch@163.com
 * @Date: 2023-01-29 13:26:07
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-01 14:09:11
 * @Description: 导出全局公共组件
 * Copyright (c) 2023 by Humphrey humphre_ch@163.com, All Rights Reserved.
 */

export default (app: DefineComponent) => {
  const files = import.meta.glob('./*/index.vue', { eager: true }) as any
  Object.keys(files).map(key => {
    const name = key.replace(/\.|\/|index.vue/g, '')
    return app.component(`${name}-global`, files[key].default || files[key])
  })
}

// 全局公共组件
// 页面直接使用 <文件夹名-global /> ，无需手动引入

// tips：组件的主文件必须命名为 index.vue
