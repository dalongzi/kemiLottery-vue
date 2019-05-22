<template>
  <div class="HomeCommon">
    <div class="HomeTop">
      <el-button type="danger" @click="gologin">退出</el-button>
    </div>

    <!-- 导航栏 -->
    <div class="HomeNav">
      <el-menu
        :default-active="$route.name"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >

        <el-submenu v-for="(value, name, index) in data" :key="index+name" :index="index+''">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(item,index) in value" :key="index+item.permissionDesc"
            :index="item.permissionName">
            {{item.permissionDesc}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      data: {}
    }
  },
  methods: {
    gologin(){
      localStorage.removeItem("token");
      localStorage.removeItem("getPermissionData");
      this.$router.push({name:'login'});
    }
  },
  created(){
    var datafilter = {}
    var data = localStorage.getItem("getPermissionData");
    data = JSON.parse(data);
    var first = data.filter(function(item){
      return item.parentid == 0
    });
    for(var value in first){
      var _id = first[value]._id;
      datafilter[first[value].permissionDesc] = data.filter(function(item){
        return item.parentid == _id
      });
    }
    this.data = datafilter;
  }
};
</script>

<style lang="scss" scoped>
.HomeNav {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  width: 250px;
  background: #545c64;
}
.HomeTop {
  width: 100%;
  height: 50px;
  background: lightblue;
  line-height: 50px;
  padding-left: 30px;
  box-sizing: border-box;
}
</style>
