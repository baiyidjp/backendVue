<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row>
          <el-col>
            <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
          </el-col>
        </el-row>
        <el-table :data="rolesList" border stripe>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row class="borderBottom vCenter" v-for="(item1, index1) in scope.row.children" :key="item1.id" :class="{ borderTop: index1 === 0 }">
                <el-col :span="5">
                  <el-tag closable @close="cancelAuth(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row v-for="(item2, index2) in item1.children" :key="item2.id" class="vCenter" :class="{ borderTop: index2 !== 0}">
                    <el-col :span="6">
                      <el-tag closable type="success" @close="cancelAuth(scope.row, item2.id)">{{ item2.authName }}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag closable type="warning" v-for="item3 in item2.children" :key="item3.id" @close="cancelAuth(scope.row, item3.id)">{{ item3.authName }}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              <el-button size="mini" type="warning" icon="el-icon-setting" @click="showAuthList(scope.row)">权限分配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog
        title="权限分配"
        :visible.sync="authDialogVisible"
        width="50%">
        <el-tree
          :data="authListData"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          :default-checked-keys="defaultKeys"
          node-key="id">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="authDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="authDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      authDialogVisible: false,
      authListData: [],
      defaultKeys: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    loadRoles () {
      this.$http.get('/roles').then(res => {
        this.rolesList = res.data
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    // 取消权限
    cancelAuth (role, id) {
      this.$confirm('你确定要取消当前权限吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = `/roles/${role.id}/rights/${id}`
        this.$http.delete(url).then(res => {
          this.$message.success('取消成功')
          role.children = res.data
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    // 展示所有权限 分配权限
    showAuthList (role) {
      this.$http.get('/rights/tree').then(res => {
        this.authListData = res.data
        this.getDefaultKeys(role, this.defaultKeys)
        console.log(this.defaultKeys)
        this.authDialogVisible = true
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    // 取出三级权限列表
    getDefaultKeys (role, list) {
      if (!role.children) {
        return list.push(role.id)
      }
      role.children.forEach(item => {
        this.getDefaultKeys(item, list)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-tag {
    margin: 5px;
  }
  .borderTop {
    border-top: .5px solid rgba(0,0,0,.1);
  }
  .borderBottom {
    border-bottom: .5px solid rgba(0,0,0,.1);
  }
  .vCenter {
    display: flex;
    align-items: center;
  }
</style>
