<template>
  <div class="jurisdiction">
    <template v-if="addPerShow">
      <add-new-permission @myclick="addPerShow=false"/>
    </template>
    <template v-else>
      <el-button type="primary" @click="addPerShow = true">新增权限</el-button>
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-submenu v-for="(value, name, index) in tableData" :key="name" :index="index+''">
          <template slot="title">
            <span>{{name}}</span>
            <delete-btn
              :del-id="value._id"
              val="删除"
              :api="$api.deletePermission"
              @deleteclick="updataPer"
              style="float:right;margin-right:30px;margin-top:10px"
            />
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(item,index) in value"
              :key="index+item.permissionDesc"
              :index="item.permissionName"
            >
              {{item.permissionDesc}}
              <delete-btn
                :del-id="item._id"
                val="删除"
                :api="$api.deletePermission"
                @deleteclick="updataPer"
                style="float:right;margin-top:5px"
              />
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </template>
  </div>
</template>

<script>
// import AddNewPermission from "../../components/PermissionChild/AddNewPermission/AddNewPermission.vue";
// import DeleteBtn from "../../common/components/DeleteBtn/DeleteBtn.vue";

export default {
  components: {
    AddNewPermission: ()=>import('../../components/PermissionChild/AddNewPermission/AddNewPermission.vue'),
    DeleteBtn: ()=>import('../../common/components/DeleteBtn/DeleteBtn.vue')
  },
  data() {
    return {
      tableData: [],
      addPerShow: false
    };
  },
  methods: {
    updataPer() {
      this.findAjax(this.$api.showAllPermission);
    }
  },
  created() {
    this.findAjax(this.$api.showAllPermission);
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
      datafilter[first[value].permissionDesc]._id = _id;
    }
    this.tableData = datafilter;
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
        datafilter[first[value].permissionDesc]._id = _id;
      }
      this.tableData = datafilter;
    }, 300);
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.jurisdiction {
  @include main;
}
</style>