<template>
  <div class="user">
    <!-- 新增用户按钮 -->
      <add-new-user @adduserclick="findAjax($api.findAllUsers)"/>
    <div class="box-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="账号名"></el-table-column>
        <el-table-column label="角色列表" width="300%">
          <template slot-scope="scope">{{scope.row.roles.join(" ")}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <editing-user :user-data="scope.row" @updateclick="findAjax($api.findAllUsers)"/>
            <delete-btn :del-id="scope.row._id" val="删除用户" :api="$api.deleteUser" @deleteclick="findAjax($api.findAllUsers)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import AddNewUser from "../../components/UserChild/AddNewUser/AddNewUser.vue"
// import DeleteBtn from '../../common/components/DeleteBtn/DeleteBtn.vue'
// import EditingUser from '../../components/UserChild/EditingUser/EditingUser.vue'

export default {
  components: {
    AddNewUser: ()=>import("../../components/UserChild/AddNewUser/AddNewUser.vue"),
    DeleteBtn: ()=>import('../../common/components/DeleteBtn/DeleteBtn.vue'),
    EditingUser: ()=>import('../../components/UserChild/EditingUser/EditingUser.vue')
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.findAjax(this.$api.findAllUsers);
    // this.findAjax(this.$api.findAllRoles);
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.user {
  @include main;
  .box-table {
    @include tablecss;
  }
}
</style>