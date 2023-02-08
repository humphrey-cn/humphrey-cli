<!--
 * @Author: Humphrey humphre_ch@163.com
 * @Date: 2023-01-29 11:21:08
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-03 16:26:51
 * @Description: 首页
-->
<template>
  <router-link to="demo">
    跳转示例
  </router-link>
  {{ a }}
  <p>{{ c }}</p>
  <button class="btn" @click="submit">跳转</button>
</template>

<script setup lang="tsx">
const a = '124'
let c = '111'
const submit = () => {
  console.log('3333')
}
</script>
