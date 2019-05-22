<template>
  <div style="display: inline;margin-right:10px">
    <el-button type="primary" @click="editingRoleButton">编辑角色</el-button>

    <el-dialog title="提示" :visible.sync="dialogFormVisible">
      <el-form :model="data" :rules="rules" ref="data" class="demo-ruleForm">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="data.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label-width="50px">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange"
            default-expand-all
            ref="tree"
            node-key="_id"
            :default-checked-keys="data.permissions"
          ></el-tree>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editingOk('data')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["roleData"],
  data() {
    return {
      data: this.roleData,
      dataArr: [],
      dialogFormVisible: false,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      },
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      }
    };
  },
  computed: {
    levelOfPermissions() {
      return this.$store.state.levelOfPermissions;
    },
    theSecondaryPermissions() {
      return this.$store.state.theSecondaryPermissions;
    }
  },
  methods: {
    editingRoleButton() {      
      this.dialogFormVisible = true;
    },
    handleCheckChange(data, checked, indeterminate) {
      // this.data.permissions = [];
      this.dataArr = [];
      for (var index in this.$refs.tree.getCheckedNodes()) {
        this.dataArr.push(this.$refs.tree.getCheckedNodes()[index]._id);
        if (this.$refs.tree.getCheckedNodes()[index].parentId) {
          this.dataArr.push(this.$refs.tree.getCheckedNodes()[index].parentId);
        }
      }
      this.dataArr = [...new Set(this.dataArr)];
    },
    loadNode(node, resolve){
      this.loadcommonNode(node, resolve);
    },
    editingOk(form){
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.data.id,this.dataArr);
          this.$http
            .post(this.$api.updateRoleInfo, {id:this.data._id,permissions:this.dataArr})
            .then(resp => {
              if (resp.data.success) {
                this.$message({
                  message: resp.data.message,
                  type: "success"
                });
              } else {
                this.$message({
                  message: resp.data.message,
                  type: "warning"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
