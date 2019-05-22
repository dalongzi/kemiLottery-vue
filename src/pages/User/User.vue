<template>
  <div class="user">
    <div class="box-table">
      <el-button type="primary">新增角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="账号名"></el-table-column>
        <el-table-column prop="describe" label="角色列表" width="300%"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑角色</el-button>
          <el-button type="danger">删除角色</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "zmt",
          describe: "管理员"
        },
        {
          name: "xjl",
          describe: "管理员1"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixin.scss';

.user {
  @include main;
  .box-table {
    @include tablecss;
  }
}
</style>