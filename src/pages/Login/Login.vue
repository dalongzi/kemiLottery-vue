<template>
  <div class="Login">
    <main class="login-main">
      <LoginForm/>
    </main>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
  .Login{
    width: 100%;
    height: 100%;
    background: url("./images/loginBG.jpg");
    background-size: cover;
    .login-main{
      width: 100%;
      height: 100%;
      background: rgba($color: #000000, $alpha: .5);
      position: relative;
      
    }
  }
</style>
