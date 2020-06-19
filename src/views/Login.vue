<template>
  <div class="loginBg">
    <div class="login_weap">
      <div class="login_border">
        <h4 class="login_title">登录</h4>
        <el-form :model="form" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input size="small" v-model="form.username" placeholder="请输入账号">
              <i slot="prefix" class="el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="small" :type="passwordType" v-model="form.password" placeholder="请输入密码">
              <i slot="prefix" class="el-icon-key"></i>
              <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
            </el-input>
          </el-form-item>
          <el-row>
            <el-col :span="20">
              <el-form-item prop="code">
                <el-input size="small" v-model="form.code" placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <img :src="authImgUrl" alt @click="changeAuthImg" />
            </el-col>
          </el-row>
          <el-form-item>
            <el-button size="small" type="primary" class="login_submit" @click="loginIn">登 录</el-button>
          </el-form-item>
          <el-button size="small" type="primary" class="login_submit" @click="register">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userRegister } from "@/api/login.js";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      passwordType: "password",
      form: {
        username: "admin",
        password: "admin",
        code: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      authImgUrl: ""
    };
  },
  created() {
    this.authImgUrl = "/api/getCode";
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    //密码框 是否可见
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    loginIn() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          userLogin(this.form).then(res => {
            this.userToken = res.token;
            // 将用户token保存到vuex中
            this.changeLogin({ Authorization: this.userToken });
            this.$router.push("/home");
          });
        }
      });
    },
    register() {
      userRegister(this.form).then(res => {
        console.log(res);
      });
    },
    changeAuthImg() {
      this.authImgUrl = "/api/getCode" + "?" + new Date().getTime();
    }
  }
};
</script>

<style lang="less">
@import "../styles/login.css";
</style>