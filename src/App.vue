<template>
  <div id="app">
      <HomeCommon v-if="$route.meta.showcommon"/>
      <router-view/>
  </div>
</template>

<script>
import HomeCommon from './components/HomeCommon/HomeCommon.vue'

export default {
  components: {
    HomeCommon
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
