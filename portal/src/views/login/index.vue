<template>
  <div class="bg" :style="{backgroundImage: 'url(' + BG + ')' }">
    <el-row type="flex" justify="center">
      <el-col>
        <div class="loginContainer">
          <p>
            <img src="~img/login/logo.png" height="80" width="80" alt="company_logo" />
          </p>
          <h2>qiankuan应用OTO管理系统</h2>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="username">
              <el-input
                v-model="ruleForm.username"
                placeholder="请输入用户名"
                auto-complete="on"
                clearable
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                placeholder="请输入密码"
                @keyup.enter.native="login"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BG from "@/assets/images/login/wallpaper.png";
// import { errorMsg, successMsg } from "@/components/el/message";

export default {
  data() {
    return {
      BG: BG,
      redirect: undefined,
      // 表单相关
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 35, message: "请输入5-35位密码", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    // 登录接口
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 登录
          this.$store
            .dispatch("login", this.ruleForm)
            .then(() => {
              this.loading = false;
              this.$message.success({
                message: "登录成功",
                duration: 1000,
                onClose: () => {
                  this.$router.push({ path: this.redirect || "/" });
                }
              });
            })
            .catch(err => {
              this.loading = false;
              this.$message.error({
                message: err || "验证错误， 请重新登录",
                duration: 1500
              });
            });
        } else {
          this.$message.error("请正确填写表单内容");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.bg {
  width: 100%;
  height: 100vh;
  min-height: 800px;
  text-align: center;
  background-size: cover;
  .el-col {
    width: 480px;
    background: rgba(255, 255, 255, 1);
    margin-top: 25vh;
    .loginContainer {
      padding: 20px;
      .el-form {
        padding: 20px;
        margin-top: 20px;
        .el-button,
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .el-form-item {
    margin-bottom: 20px;
  }
}
.el-message {
  top: 20px !important;
}
</style>
