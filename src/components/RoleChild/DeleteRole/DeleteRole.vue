<template>
  <el-button type="danger" @click="deleteRoleButton">删除角色</el-button>
</template>

<script>
export default {
  props: ["roleId"],
  methods: {
    deleteRoleButton() {
      this.$confirm("确定删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(this.$api.deleteRole, {_id:this.roleId})
            .then(resp => {
              this.$emit("myclick")
              this.$message({
                type: "success",
                message: "删除成功!"
              });
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
