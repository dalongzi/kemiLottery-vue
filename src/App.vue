<template>
  <div id="app">
    <template v-if="show">
      <HomeCommon/>
    </template>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>
import HomeCommon from './components/HomeCommon/HomeCommon.vue'

export default {
  data() {
    return {
      show: true
    }
  },
  components: {
    HomeCommon
  },
  computed: {
    showlogin() {
      console.log(this.$router.history);
      if (this.$router.history.current.fullPath == "/login") {
        return this.show = false;
      }else{
        console.log(this.show);
        return this.show = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
