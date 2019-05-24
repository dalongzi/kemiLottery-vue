<template>
  <div style="width: 100%">
    <el-button type="danger" @click="$emit('myclick')">返回</el-button>

    <el-table :data="tableData.data" stripe style="width: 100%">
      <el-table-column prop="period" label="日期" width="200"></el-table-column>
      <el-table-column label="开奖结果">
        <template slot-scope="scope">{{scope.row.winnerNumber.join("、 ")}}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.total"
      @current-change="currentBtn"
      :current-page="this.pageNo"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ["gameName"],
  data() {
    return {
      tableData: {},
      pageNo: 1
    };
  },
  methods: {
    httpfindByGame() {
      this.$http
        .get(this.$api.findByGameName, {
          gameName: this.gameName,
          pageNo: this.pageNo,
          pageSize: 10
        })
        .then(resp => {
          this.tableData = resp.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    currentBtn(value){
      this.pageNo = value;
      this.httpfindByGame();
    }
  },
  mounted() {
    this.httpfindByGame();
  }
};
</script>

<style lang="scss" scoped>
</style>
