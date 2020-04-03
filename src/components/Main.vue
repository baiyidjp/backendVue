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
        <el-aside width="200px">
          <el-menu
            default-active="1"
            background-color="#5a2b81"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">选项1-1</el-menu-item>
              <el-menu-item index="1-2">选项1-2</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>导航二</span>
              </template>
              <el-menu-item index="2-1">选项2-1</el-menu-item>
              <el-menu-item index="2-2">选项2-2</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
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
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo_container {
          display: flex;
          align-items: center;
          color: #000000;
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
        background-color: #5a2b81;
        el-submenu_title:hover {
          background-color: #DED4E6;
        }
        el-menu-item:hover {
          /*background-color: #DED4E6;*/
        }
      }
      .el-main {
        background-color: #fafafa;
      }
    }
  }
</style>
