<template>
  <div class="lotteryItem">
    <div class="lottery-img addNewLottery">
      <i class="el-icon-plus avatar-uploader-icon" @click="dialogFormVisible = true"></i>
    </div>

    <el-dialog title="新增彩票" :visible.sync="dialogFormVisible" style="cursor:default">
      <el-form ref="addNewGameInfo" :model="addNewGameInfo" :rules="rules" class="demo-ruleForm">
        <table>
          <tr>
            <td>彩票英文名</td>
            <td>
              <el-form-item prop="en">
                <el-input v-model="addNewGameInfo.en"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>彩票中文名</td>
            <td>
              <el-form-item prop="cn">
                <el-input v-model="addNewGameInfo.cn"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>icons</td>
            <td>
              <el-form-item prop="icon">
                <input
                  type="file"
                  name="file"
                  id="filemini"
                  class="inputfile"
                  ref="inputminifile"
                  accept="image/*"
                  @change="changepic('inputminifile','imgminifile','newminisrc', 40)"
                >
                <label
                  for="filemini"
                  class="filepath"
                  style="width:40px;height:40px;line-height:40px"
                >
                  <img v-if="imgminiShow" :src="newminisrc" id="show" ref="imgminifile">
                  <i v-else class="el-icon-plus"></i>
                </label>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>icons</td>
            <td>
              <el-form-item prop="icon2">
                <input
                  type="file"
                  name="file"
                  id="file"
                  class="inputfile"
                  ref="inputfile"
                  accept="image/*"
                  @change="changepic('inputfile','imgfile', 'newsrc', 90)"
                >
                <label for="file" class="filepath">
                  <img v-if="imgShow" :src="newsrc" id="show" ref="imgfile">
                  <i v-else class="el-icon-plus"></i>
                </label>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addNewGameButton('addNewGameInfo')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["gameId"],
  data() {
    var validateimg = (rule, value, callback) => {
      if (!this.$refs["inputminifile"].value) {
        callback(new Error("需要上传图片"));
      } else {
        callback();
      }
    };
    var validateimg2 = (rule, value, callback) => {
      if (!this.$refs["inputfile"].value) {
        callback(new Error("需要上传图片"));
      } else {
        callback();
      }
    };

    return {
      dialogFormVisible: false,
      addNewGameInfo: {
        en: "",
        cn: "",
        _id: this.gameId
      },
      rules: {
        en: [{ required: true, message: "不能为空", trigger: "blur" }],
        cn: [{ required: true, message: "不能为空", trigger: "blur" }],
        icon: [
          {
            validator: validateimg,
            required: true,
            message: "需要上传图片",
            trigger: "blur"
          }
        ],
        icon2: [
          {
            validator: validateimg2,
            required: true,
            message: "需要上传图片",
            trigger: "blur"
          }
        ]
      },
      newminisrc: "",
      newsrc: "",
      imgminiShow: false,
      imgShow: false,
      uploadFiles: []
    };
  },
  methods: {
    changepic(obj, img, src, size) {
      new Promise((resolve, reject) => {
        if (src == "newminisrc") {
          this.newminisrc = this.getObjectURL(this.$refs[obj].files[0]);
          this.imgminiShow = true;
        } else {
          this.newsrc = this.getObjectURL(this.$refs[obj].files[0]);
          this.imgShow = true;
        }
        var timer = setInterval(() => {
          if (this.$refs[img] != undefined) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      }).then(resp => {
        if (
          !(
            this.$refs[img].clientWidth == size &&
            this.$refs[img].clientHeight == size
          )
        ) {
          this.$message({
            message: "图片尺寸需要" + size + "×" + size,
            type: "warning"
          });
          this.$refs[obj].value = "";
          if (src == "newminisrc") {
            this.newminisrc = "";
            this.imgminiShow = false;
          } else {
            this.newsrc = "";
            this.imgShow = false;
          }
        }
      });
    },
    getObjectURL(file) {
      var url = null;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    addNewGameButton(dataForm) {
      this.$refs[dataForm].validate(valid => {
        if (valid) {
          this.uploadFiles = [];
          this.uploadFiles.push(this.$refs["inputminifile"].files[0]);
          this.uploadFiles.push(this.$refs["inputfile"].files[0]);
          var fd = new FormData();
          for (var i = 0; i < this.uploadFiles.length; i++) {
            fd.append("file", this.uploadFiles[i]);
          }
          fd.append("en", this.addNewGameInfo.en);
          fd.append("cn", this.addNewGameInfo.cn);
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          axios
            .post(this.$api.addNewGame, fd, config)
            .then(resp => {
              this.$message({
                message: resp.data.message,
                type: resp.data.success?'success':'danger'
              });
              if (resp.data.success) {
                this.$emit("updateclick");
              }else{
                console.log(resp.data.message);
              }
              this.dialogFormVisible = false;
            })
            .catch((error)=>{
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
// 添加
.addNewLottery {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
}
table {
  width: 100%;
  tr,
  td {
    border: 1px solid #ccc;
  }
}

// 上传图片input样式
.inputfile {
  position: absolute;
  clip: rect(0 0 0 0);
}
.filepath {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  cursor: pointer;
  &:hover {
    border-color: #409eff;
  }
}
</style>
