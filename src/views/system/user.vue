<template>
  <div>
    <my-table
      ref="table"
      :option="option"
      :data="data"
      :table-loading="loading"
      @on-load="onLoad"
      @on-new="onNew"
      @on-view="onView"
      @on-edit="onEdit"
      @on-del="onDel"
      @on-multi-del="onMultiDel"
      @selection-change="selectionChange"
    ></my-table>
    <user-dialog
      ref="userDialog"
      :isShowDialog="isShowDialog"
      :formData="formData"
      :isView="isView"
      :titleText="titleText"
      @on-result-change="changeIsShowDialog"
      @child-add="childSuccess"
      @child-cancel="childCancel"
    ></user-dialog>
  </div>
</template>

<script>
import { getlist, addAndEdit, del } from "@/api/user.js";
import userDialog from "./dialog/userDialog";

export default {
  name: "user",
  components: {
    userDialog
  },
  data() {
    return {
      isShowDialog: false,
      formData: {},
      isView: false,
      titleText: "新增",
      loading: false,
      data: [],
      selectionList: [],
      option: {
        newBtn: true,
        multiDelBtn: true,
        viewBtn: true,
        editBtn: true,
        delBtn: true,
        column: [
          {
            prop: "name",
            label: "姓名"
          },
          {
            prop: "age",
            label: "年龄"
          },
          {
            prop: "sex",
            label: "性别"
          }
        ]
      },
      dialogEdit: {
        visible: false,
        isView: false,
        addOrUpdata: false,
        dataSource: null
      }
    };
  },
  computed: {
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      getlist(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        this.$refs.table.page.total = res.meta.pageTotal;
        this.data = res.data;
        this.loading = false;
        this.selectionClear();
      });
    },
    onNew() {
      this.titleText = "新增";
      this.isView = false;
      this.formData = null;
      this.isShowDialog = !this.isShowDialog;
    },
    onView(row, index) {
      this.isView = true;
      this.titleText = "查看";
      this.formData = Object.assign({}, row);
      this.isShowDialog = !this.isShowDialog;
    },
    onEdit(row, index) {
      this.titleText = "编辑";
      this.isShowDialog = !this.isShowDialog;
      this.formData = Object.assign({}, row);
      this.isView = false;
    },
    onDel(row, index) {
      this.$confirm("确定删除当前数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return del(row.id);
        })
        .then(() => {
          this.onLoad(this.$refs.table.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    onMultiDel() {
      if (!this.selectionList || this.selectionList.length == 0) {
        this.$message.warning("至少选择一条数据！");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return del(this.ids);
        })
        .then(() => {
          this.onLoad(this.$refs.table.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.table.toggleSelection();
        });
    },
    selectionChange(val) {
      this.selectionList = val;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.table.toggleSelection();
    },
    dialogResult(result) {
      if (result.result) {
        this.onLoad(this.$refs.table.page);
      }
      this.dialogEdit.visible = result.visible;
    },
    //成功回调
    childSuccess(data) {
      addAndEdit(data).then(res => {
        this.isShowDialog = false;
        this.onLoad(this.$refs.table.page);
      });
    },
    //取消回调
    childCancel() {
      this.isShowDialog = false;
    },
    changeIsShowDialog(val) {
      this.isShowDialog = val; //监听变化时触发的函数修改父组件的是否显示状态
    }
  }
};
</script>

<style scoped>
</style>