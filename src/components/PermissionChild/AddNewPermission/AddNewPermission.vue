<template>
  <div>
    <el-form :model="dataForm" :rules="rules" ref="dataForm" class="demo-ruleForm">
      <table>
        <tr>
          <td>权限名称</td>
          <td>
            <el-form-item prop="permissionDesc">
              <el-input v-model="dataForm.permissionDesc"></el-input>
            </el-form-item>
          </td>
          <td>父级权限</td>
          <td>
            <el-form-item prop="parentid">
              <el-input v-model="dataForm.parentid"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>权限描述</td>
          <td>
            <el-form-item prop="permissionName">
              <el-input v-model="dataForm.permissionName"></el-input>
            </el-form-item>
          </td>
          <td>权限等级</td>
          <td>
            <el-form-item prop="permissionLeve">
              <el-input type="number" v-model="dataForm.permissionLeve"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>排列序号</td>
          <td>
            <el-form-item prop="sortNum">
              <el-input type="number" v-model="dataForm.sortNum"></el-input>
            </el-form-item>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4">
            <el-button type="danger" @click="$emit('myclick')">取消</el-button>
            <el-button type="primary" @click="addNewPermissionButton('dataForm')">提交</el-button>
          </td>
        </tr>
      </table>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        permissionDesc: "",
        parentid: 0,
        permissionName: "",
        permissionLeve: 0,
        sortNum: 0
      },
      rules: {
        permissionDesc: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        parentid: [{ required: true, message: "不能为空", trigger: "blur" }],
        permissionName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        permissionLeve: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        sortNum: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    addNewPermissionButton(dataForm) {
      this.$refs[dataForm].validate(valid => {
        if (valid) {
          this.$http
            .post(this.$api.addNewPersmission, this.dataForm)
            .then(resp => {
              this.$message({
                message: resp.data.message,
                type: "success"
              });
              this.$emit("myclick");
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  tr,
  td {
    border: 1px solid #ccc;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
