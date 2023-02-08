<!--
 * @Author: Humphrey humphre_ch@163.com
 * @Date: 2023-01-29 10:31:37
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-02 10:28:12
 * @Description: 
 * Copyright (c) 2023 by Humphrey humphre_ch@163.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

// /**
//  * ctrl + cmd + t 快速生成函数注释
//  * @description: 
//  * @param {*} a
//  * @param {*} b
//  * @return {*}
//  */
// const aaa = function (a: number, b: number) {
//   return a + b
// }
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    计算
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
  <button class="btn">按钮</button>
</template>

<style lang="less" scoped>
.card {
  color: @text-color;
}
</style>
