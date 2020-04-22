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
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ADADAD">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="用户设置" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="param.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="param.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
        pagesize: 5
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
        this.total = res.data.total
      })
    },
    // 监听pageSize改变的事件(改变当前一页显示多少条)
    handleSizeChange (pageSize) {
      this.param.pagesize = pageSize
      this.loadUserList()
    },
    // 监听页码值的改变
    handleCurrentChange (pageNum) {
      this.param.pagenum = pageNum
      this.loadUserList()
    }
  }
}
</script>

<style scoped>

</style>
