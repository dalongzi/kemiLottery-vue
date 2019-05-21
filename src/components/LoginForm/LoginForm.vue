<template>
  <div class="login-form">
    <h1>可米彩票</h1>
    <div class="form-main">
      <el-form :model="userInfo" :rules="rules" ref="userInfo">
        <el-form-item prop="accountName" color="transparent">
          <el-input class="custom-input" v-model="userInfo.accountName" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="custom-input" v-model="userInfo.password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onlogin('userInfo')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      userInfo: {
        accountName: "",
        password: ""
      },
      rules: {
        accountName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3到12个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onlogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post(this.$api.signin, this.userInfo).then(resp => {
            if(resp.data.message === "登录成功"){
              console.log(resp);
            }else{
              this.$message.error('用户名或密码错误');
              this.userInfo.password = '';
            }
          }).catch((err)=>{
            this.$message.error('用户名或密码错误');
            this.userInfo.password = '';
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.custom-input input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
}
</style>

<style lang="scss" scoped>
.login-form {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 70%;
  background: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  h1 {
    color: white;
    opacity: 0.5;
    font-size: 60px;
  }
  .form-main {
    width: 70%;
    height: 50%;
    display: flex;
    flex-direction: column;
    .el-form-item {
      margin-bottom: 40px;
      border-bottom: 1px solid rgba($color: #fff, $alpha: 0.5);
    }
  }

  .el-button {
    width: 100%;
  }
}
</style>
