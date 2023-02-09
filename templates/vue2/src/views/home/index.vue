<!--
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2022-12-16 17:20:12
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-09 10:03:13
 * @Description:
-->
<template>
  <div>
    Home
    <header-global />
    <div class="btn">xxx</div>
    <div class="text">dsafdsfa</div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {

    };
  },
  created() {
    // this.$api.demo.login({
    //   username: 'admin',
    //   password: '123456'
    // }).then(res => {
    //   console.log(res)
    // })
  },
  mounted() {
    console.log(this.$store, 777)
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
.text {
  color: @text-color;
  font-size: 18px;
}
</style>
