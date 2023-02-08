/*
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2023-02-02 09:47:13
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-02 10:08:20
 * @Description: vuex状态管理
 */
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

// state 类型声明
export interface State {
  count: number
  foo: string
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state() {
    return {
      // 数据类型需要在 `src/vuex.d.ts` 中进行声明
      count: 0,
      foo: 'xxx',
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
  },
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
