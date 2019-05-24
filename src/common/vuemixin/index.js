import Vue from 'vue'

Vue.mixin({
  methods: {
    // 获取所有数据
    findAjax(api) {
      this.$http
        .get(api)
        .then(resp => {
          if(resp.data.allRoles){
            this.tableData = resp.data.allRoles;
          }else if(resp.data.allUsers){
            this.tableData = resp.data.allUsers;
          }else if(resp.data.allPermission){
            this.tableData = resp.data.allPermission;
          }
          
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 权限树形复选框
    loadcommonNode(node, resolve) {
      if (node.level === 0) {
        var arr = [];
        for (var value in this.levelOfPermissions) {
          arr.push({
            name: this.levelOfPermissions[value].permissionDesc,
            _id: this.levelOfPermissions[value]._id
          });
        }

        return resolve(arr);
      }
      if (node.level > 1) return resolve([]);

      for (var key in this.theSecondaryPermissions) {
        if (node.data.name === key) {
          var arr1 = [];
          for (var value in this.theSecondaryPermissions[key]) {
            arr1.push({
              name: this.theSecondaryPermissions[key][value].permissionDesc,
              _id: this.theSecondaryPermissions[key][value]._id,
              parentId: node.data._id,
              leaf: true
            });
          }

          return resolve(arr1);
        }
      }
    }
  }
});