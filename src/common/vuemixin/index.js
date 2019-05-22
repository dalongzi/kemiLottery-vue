import Vue from 'vue'

Vue.mixin({
  methods: {
    findRoleAjax() {
      this.$http
        .get(this.$api.findAllRoles)
        .then(resp => {
          this.tableData = resp.data.allRoles;
        })
        .catch(error => {
          console.log(error);
        });
    },
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