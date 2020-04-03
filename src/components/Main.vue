<template>
  <div class="main">
    <el-container class="main_container">
      <!--头部-->
      <el-header>
        <div class="logo_container">
          <img src="../assets/img/1024.png" alt="" width="44px">
          <div>后台管理系统</div>
        </div>
        <div>
          <el-button type="primary" @click="clickLogout">退出</el-button>
        </div>
      </el-header>
      <!--主要-->
      <el-container>
        <!--边栏-->
        <el-aside width="200px">Aside</el-aside>
        <!--显示区域-->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    clickLogout () {
      window.sessionStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    height: 100%;
    .main_container {
      height: 100%;
      .el-header {
        background-color: #5a2b81;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo_container {
          display: flex;
          align-items: center;
          color: #ffffff;
          font-size: 20px;
          img {
            margin-right: 10px;
          }
        }
        .el-button {
          width: 80px;
          height: 40px;
        }
      }
      .el-aside {
        background-color: #0086b3;
      }
      .el-main {
        background-color: #fafafa;
      }
    }
  }
</style>
