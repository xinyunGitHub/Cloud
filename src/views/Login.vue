<template>
  <div class="login">
    <h3>Cloud 后台管理系统</h3>
    <el-row :gutter="24">
      <el-col :span="19" :offset="2">
        <el-form label-position="left" label-width="58px" ref="loginForm" :model="loginForm" :rules="loginRules">
          <el-form-item label="账号" prop="account">
            <el-input v-model="loginForm.account" type="text" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="verifyForm('loginForm')">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { loginCloud } from "./../assets/api/login.js"
import { setItem } from "./../assets/js/appUtils.js"
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: 'admin',
        password: '123456'
      },
      loginRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    verifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userLogin();
        } else {
          this.$message({
            message: '账号密码输入错误～',
            type: 'warning'
          });
          return false;
        }
      });
    },
    async userLogin() {
      let result = await loginCloud(this.loginForm);
      if (result.status) {
        setItem('account', result.data.account);
        setItem('token', result.data.token);
        setItem('expired', result.data.expired);
        this.$store.commit("setLoginStatus", true);
        this.$message({
          message: result.message,
          type: 'success'
        });
        this.$router.push({
          path: '/'
        })
      } else {
        this.$message.error(result.message);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  top: 44%;
  left: 50%;
  padding: 0 0 12px 0;
  width: 420px;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  > h3 {
    margin: 36px 0 32px 0;
    font-size: 20px;
    color: #333333;
    font-weight: normal;
    text-align: center;
  }
}
</style>