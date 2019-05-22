<template>
  <div class="role">
    <!-- 表格 -->
    <div class="box-table">
      <el-button type="primary" @click="dialogTableVisible = true">新增角色</el-button>
      <!-- 新增角色 -->
      <el-dialog title="提示" :visible.sync="dialogTableVisible">
        <el-form :model="addNewRoleInfo" :rules="rules" ref="addNewRoleInfo" class="demo-ruleForm">
          <table class="addNewTable">
            <tr>
              <td>角色名称</td>
              <td>
                <el-form-item prop="roleName">
                  <el-input v-model="addNewRoleInfo.roleName"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>角色描述</td>
              <td>
                <el-form-item prop="roleDesc">
                  <el-input v-model="addNewRoleInfo.roleDesc"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>权限设置</td>
              <td>
                <el-form-item prop="permissions">
                  <el-tree
                    :props="props"
                    :load="loadNode"
                    lazy
                    show-checkbox
                    @check-change="handleCheckChange"
                    default-expand-all
                    ref="tree"
                  ></el-tree>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewRoleButton('addNewRoleInfo')">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="详情" width="100"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <editing-role :role-data="scope.row"/>
            <delete-role :role-id="scope.row._id" @myclick="findRoleAjax"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import DeleteRole from "../../components/RoleChild/DeleteRole/DeleteRole.vue";
import EditingRole from "../../components/RoleChild/EditingRole/EditingRole.vue";

export default {
  components: {
    DeleteRole,
    EditingRole
  },
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      addNewRoleInfo: {
        roleName: "",
        roleDesc: "",
        permissions: []
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ],
        permissions: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个权限",
            trigger: "change"
          }
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
    handleCheckChange(data, checked, indeterminate) {
      var dataArr = (this.addNewRoleInfo.permissions = []);
      for (var index in this.$refs.tree.getCheckedNodes()) {
        dataArr.push(this.$refs.tree.getCheckedNodes()[index]._id);
        if (this.$refs.tree.getCheckedNodes()[index].parentId) {
          dataArr.push(this.$refs.tree.getCheckedNodes()[index].parentId);
        }
      }
      dataArr = [...new Set(dataArr)];
    },

    loadNode(node, resolve) {
      this.loadcommonNode(node, resolve);
    },

    addNewRoleButton(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$http
            .post(this.$api.addNewRole, this.addNewRoleInfo)
            .then(resp => {
              if (resp.data.success) {
                this.findRoleAjax();
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
          this.dialogTableVisible = false;
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.findRoleAjax();
    // this.allPerimission = JSON.parse(localStorage.getItem("getPermissionData"));
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
.addNewTable {
  width: 100%;
  tr,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>
