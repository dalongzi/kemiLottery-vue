<template>
  <div class="role">
    <div class="box-table">
      <el-button type="primary" @click="dialogTableVisible = true">新增角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="describe" label="角色描述" width="180"></el-table-column>
        <el-table-column label="详情" width="100"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑角色</el-button>
          <el-button type="danger">删除角色</el-button>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import FormCommon from '../../components/FormCommon/FormCommon.vue'
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
      ],
      dialogTableVisible: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    // addNewRole() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.role {
  @include main;
  .box-table {
    @include tablecss;
  }
}
</style>
