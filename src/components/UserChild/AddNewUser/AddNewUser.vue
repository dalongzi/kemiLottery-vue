<template>
  <div>
    <el-button type="primary" @click="addUserButton">新增角色</el-button>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="addUserInfo" :rules="rules" ref="addUserInfo" class="demo-ruleForm">
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-form-item prop="username">
                <el-input v-model="addUserInfo.username"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-form-item prop="password">
                <el-input v-model="addUserInfo.password"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>角色</td>
            <td>
              <el-form-item prop="roles">
                <el-checkbox-group v-model="addUserInfo.roles">
                  <el-checkbox
                    v-for="(item,index) in tableData"
                    :key="index+item.roleName"
                    :label="item.roleName"
                    name="roles"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addYesButton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      addUserInfo: {
        username: "",
        password: "",
        roles: []
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3到12个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      tableData: []
    };
  },
  methods: {
    addUserButton() {
      this.findAjax(this.$api.findAllRoles);
      this.dialogFormVisible = true;
    },
    addYesButton() {
      this.$http
        .post(this.$api.addNewUser, this.addUserInfo)
        .then(resp => {
          if(resp.data.success){
            this.$emit("adduserclick");
            this.$message({
              message: resp.data.message,
              type: "success"
            });
          }else{
            this.$message({
              message: resp.data.message,
              type: 'warning'
            });
          }
          this.dialogFormVisible = false;
        })
        .catch(error => {
          console.log(error);
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
    vertical-align: middle;
    padding-top: 20px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}
</style>
