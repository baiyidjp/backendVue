<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img class="avatar_image" src="../assets/img/1024.png" alt="">
      </div>
      <!-- 登陆 -->
      <div class="from_container">
        <el-form :model="form" :rules="rules" ref="formRef">
          <!-- 用户名 -->
          <el-form-item prop="account">
            <el-input v-model="form.account" clearable placeholder="请输入账号" prefix-icon="iconfont iconzhanghao"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="form.password" show-password placeholder="请输入密码" prefix-icon="iconfont iconmima"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="button_container">
            <el-button type="primary" :loading="loading" @click="loginClick">登录</el-button>
            <el-button type="info" @click="resetClick">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import loginRequest from '../network/login'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },

  methods: {
    loginClick () {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.loading = true
          loginRequest.login(this.form.account, this.form.password).then((res) => {
            this.loading = false
            if (res.meta.status === 200) {
              this.$message.success('恭喜你,登录成功')
              // 保存在sessionStorage中
              window.sessionStorage.setItem('token', res.data.token)
              // 跳转到首页
              this.$router.replace('/main')
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        } else {
          return false
        }
      })
    },

    resetClick () {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>

  .login_container {
    background: #2b4b6b;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .avatar_box {
      display: flex;
      width: 130px;
      height: 130px;
      margin-top: -65px;

      .avatar_image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #eee;
      }
    }

    .from_container {
      margin-top: 20px;
      width: 80%;

      .button_container {
        display: flex;
        justify-content: center;

        .el-button--info {
          margin-left: 50px;
        }
      }
    }
  }

</style>
