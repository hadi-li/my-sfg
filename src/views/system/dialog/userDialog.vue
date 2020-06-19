<template>
  <el-dialog
    :title="titleText"
    :visible.sync="showDialog"
    width="60%"
    v-dialogDrag
    @close="Onclose"
    @open="opend"
  >
    <el-form label-width="80px" :model="form" ref="form" :rules="rules" :disabled="isView">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="Sdept">
        <el-input v-model="form.Sdept"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="childAdd" v-if="!isView">确 认</el-button>
      <el-button @click="childCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>
 
<script>
export default {
  name: "about",
  props: {
    isShowDialog: {
      type: Boolean,
      default: true
    },
    titleText: {
      type: String,
      default: "新增"
    },
    isView: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {
        name: "",
        age: "",
        sex: ""
      }
    }
  },
  data() {
    return {
      showDialog: this.isShowDialog,
      form: {
        name: "",
        age: "",
        sex: "",
        Sdept: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        Sdept: [{ required: true, message: "请输入单位", trigger: "blur" }]
      }
    };
  },
  methods: {
    opend() {
      if (this.formData != null) {
        this.$nextTick(function() {
          this.form = Object.assign({}, this.formData);
        });
      }
    },
    //保存 和 修改
    childAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("child-add", this.form);
        }
      });
    },
    //取消
    childCancel() {
      this.$emit("child-cancel");
    },
    Onclose() {
      this.$refs.form.resetFields();
      this.form.id = "";
    }
  },
  watch: {
    isShowDialog(val) {
      this.showDialog = val; //②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
    },
    showDialog(val) {
      this.$emit("on-result-change", val); //③组件内对myResult变更后向外部发送事件通知
    }
  }
};
</script>
 
<style scoped>
</style>