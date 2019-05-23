<template>
  <el-button type="danger" @click="deleteUserButton">{{val}}</el-button>
</template>

<script>
export default {
  props: ["delId","val","api"],
  methods: {
    deleteUserButton() {
      this.$confirm("确定"+this.val+"?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(this.api, { _id: this.delId })
            .then(resp => {
              if (resp.data.success) {
                this.$emit("deleteclick");
                this.$message({
                  type: "success",
                  message: resp.data.message
                });
              }else{
                console.log(resp.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
