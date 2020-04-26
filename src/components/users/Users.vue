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
          <el-input placeholder="请输入内容" v-model="param.query" clearable @clear="loadUserList">
            <el-button slot="append" icon="el-icon-search" @click="loadUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
              inactive-color="#ADADAD"
              @change="userStatusChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserClicked(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserClicked(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="用户设置" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="userSettingClicked(scope.row.id)"></el-button>
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
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="dialogClosed">
      <el-form :model="addUserForm" :rules="addUserRules" label-width="70px" ref="addUserRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSureClicked">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed">
      <el-form :model="editUserForm" :rules="addUserRules" label-width="70px" ref="editUserRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogSureClicked">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if (regEmail.test(value)) {
        callback()
      } else {
        callback(new Error('请输入合法的邮箱'))
      }
    }
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        callback()
      } else {
        callback(new Error('请输入合法的手机号'))
      }
    }
    return {
      param: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度是3~10位字符' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码的长度是6~18位字符' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editUserForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.loadUserList()
  },
  methods: {
    loadUserList () {
      this.$http.get('/users', this.param).then((res) => {
        console.log(res)
        this.userList = res.data.users
        this.total = res.data.total
      }).catch((error) => {
        this.$message.error(error.msg)
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
    },
    // 监听用户状态的改变
    userStatusChanged (userInfo) {
      this.$http.put(`/users/${userInfo.id}/state/${userInfo.mg_state}`).then((res) => {
        this.$message.success('更改成功')
      }).catch((error) => {
        userInfo.mg_state = !userInfo.mg_state
        this.$message.error(error.msg)
      })
    },
    // 添加用户关闭
    dialogClosed () {
      this.$refs.addUserRef.resetFields()
    },
    // 确定添加
    dialogSureClicked () {
      // 验证表格
      this.$refs.addUserRef.validate((valid) => {
        if (!valid) return
        this.$http.post('/users', this.addUserForm).then((res) => {
          console.log(res)
          this.addDialogVisible = false
          this.loadUserList()
        })
      })
    },
    // 编辑用户按钮的点击
    editUserClicked (id) {
      const url = `/users/${id}`
      this.$http.get(url).then(res => {
        this.editUserForm = res.data
        this.editDialogVisible = true
      })
    },
    // 关闭编辑弹窗
    editDialogClosed () {
      this.$refs.editUserRef.resetFields()
    },
    // 确定编辑
    editDialogSureClicked () {
      this.$refs.editUserRef.validate(valid => {
        if (!valid) return
        const url = `/users/${this.editUserForm.id}`
        this.$http.put(url, { email: this.editUserForm.email, mobile: this.editUserForm.mobile }).then((res) => {
          this.editDialogVisible = false
          this.loadUserList()
          this.$message.success('用户信息修改成功')
        }).catch(error => {
          this.$message.error(error.msg)
        })
      })
    },
    // 删除用户的点击
    deleteUserClicked (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = `/users/${id}`
        this.$http.delete(url).then(res => {
          this.loadUserList()
          this.$message.success('用户删除成功')
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    // 设置
    userSettingClicked (id) {}
  }
}
</script>

<style scoped>

</style>
