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
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <el-button class="collapse_button" type="primary" plan @click="collapseButtonClick">{{isCollapse ? "展开" : "收起"}}</el-button>
          <el-menu
            default-active="1"
            background-color="#5a2b81"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            :collapse = "isCollapse"
            :collapse-transition = "false">
            <!-- 一级菜单 -->
            <el-submenu v-for="item in menusData" :key="item.id" :index="item.id + ''">
              <template slot="title">
                <img :src="item.image" class="item_menu_image">
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :key="child.id" :index="child.id + ''">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{child.authName}}</span>
                </template>
              </el-menu-item>
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

import mainRequest from '../network/main_page'

export default {
  name: 'Main',
  data () {
    return {
      menusData: [],
      isCollapse: false
    }
  },
  created () {
    this.requestMenuData()
  },
  methods: {
    clickLogout () {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    requestMenuData () {
      mainRequest.menuData().then((res) => {
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        const menusData = res.data
        for (let i = 0; i < menusData.length; i++) {
          const menuData = menusData[i]
          menuData.image = require(`../assets/img/menu/menu_${i}.png`)
        }
        this.menusData = menusData
      })
    },
    collapseButtonClick () {
      this.isCollapse = !this.isCollapse
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
        display: flex;
        flex-direction: column;
        .collapse_button {
          height: 44px;
          width: 64px;
          padding: 0px;
          border-radius: 0px;
          background-color: #5a2b81;
          border: none;
          align-self: center;
        }
        .el-menu {
          border-right: none;
          .item_menu_image {
            margin-right: 10px;
          }
        }
      }
      .el-main {
        background-color: #fafafa;
      }
    }
  }
</style>
