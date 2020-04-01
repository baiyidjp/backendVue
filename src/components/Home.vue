<template>
  <div>
    Home页面
    <el-button type="primary" @click="clickLogout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    clickLogout () {
      window.sessionStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
