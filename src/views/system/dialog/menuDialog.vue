<template>
  <el-dialog
    :title="titleText"
    :visible.sync="showDialog"
    width="60%"
    v-dialogDrag
    @close="Onclose"
    @open="opend"
  >
    <el-form :model="menuForm" ref="menuForm" label-width="80px" :disabled="isView">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="菜单" prop="menuName">
            <el-input type="text" placeholder="菜单" v-model="menuForm.menuName" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="路由" prop="path">
            <el-input type="text" placeholder="路由地址" v-model="menuForm.path" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="图标" prop="source">
            <el-input placeholder="请选择图标" v-model="menuForm.source" @focus="sourceDialog = true">
              <i slot="append" style="font-size:18px;color:skyblue;" :class="menuForm.source"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="menuForm.remark"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="备注"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <icon-lists
      :iconDialog="sourceDialog"
      @child-cancel="iconClose"
      @on-result-change="iconIsShowDialog"
      :icontitleText="icontitleText"
      @child-add="iconChildSuccess"
    ></icon-lists>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="childAdd" v-if="!isView">确 认</el-button>
      <el-button @click="childCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>
 
<script>
import iconLists from "./iconLists.vue";

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
  components: {
    iconLists
  },
  data() {
    return {
      icontitleText: "选择图标",
      sourceDialog: false,
      showDialog: this.isShowDialog,
      menuForm: {
        menuName: "",
        path: "",
        source: "",
        remark: ""
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
          this.menuForm = Object.assign({}, this.formData);
        });
      }
    },
    //保存 和 修改
    childAdd() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          this.$emit("child-add", this.menuForm);
        }
      });
    },
    //取消
    childCancel() {
      this.$emit("child-cancel");
    },
    Onclose() {
      this.$refs.menuForm.resetFields();
      this.menuForm.id = "";
    },

    //成功回调
    iconChildSuccess(icon) {
      this.menuForm.source = icon;
      this.sourceDialog = false;
    },
    iconClose() {
      this.sourceDialog = false;
    },
    iconIsShowDialog(val) {
      this.sourceDialog = val; //监听变化时触发的函数修改父组件的是否显示状态
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