<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--用护列表-->
      <el-table :data="userList" border stripe>
        <!--索引列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.msg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import userRequest from '../../network/user_page'
export default {
  name: 'Users',
  data () {
    return {
      param: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: []
    }
  },
  created () {
    this.loadUserList()
  },
  methods: {
    loadUserList () {
      userRequest.userList(this.param).then((res) => {
        console.log(res)
        if (res.meta.status !== 200) this.$message.error(res.meta.msg)
        this.userList = res.data.users
      })
    }
  }
}
</script>

<style scoped>

</style>
