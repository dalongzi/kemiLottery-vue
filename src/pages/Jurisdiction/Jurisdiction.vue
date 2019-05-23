<template>
  <div class="jurisdiction">
    <el-button type="primary">新增权限</el-button>
    <el-menu default-active="2" class="el-menu-vertical-demo">

      <el-submenu
        v-for="(value, name, index) in tableData"
        :key="name"
        :index="index+''"
      >
        <template slot="title">
          <span>{{name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item,index) in value"
            :key="index+item.permissionDesc"
            :index="item.permissionName"
          >{{item.permissionDesc}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  computed: {
  },
  methods: {
  },
  created() {
    this.findAjax(this.$api.showAllPermission);
  },
  mounted() {
    setTimeout(() => {
      var datafilter = {};
      var data = this.tableData;
      var first = data.filter(function(item) {
        return item.parentid == 0;
      });
      for (var value in first) {
        var _id = first[value]._id;
        datafilter[first[value].permissionDesc] = data.filter(function(item) {
          return item.parentid == _id;
        });
      }
      this.tableData = datafilter;
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.jurisdiction {
  @include main;
}
</style>