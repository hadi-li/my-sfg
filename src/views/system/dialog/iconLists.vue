<template>
  <el-dialog :title="icontitleText" :visible.sync="showIconDialog" width="60%" append-to-body>
    <el-tabs v-model="activeName">
      <el-tab-pane label="通用图标" name="first">
        <el-row>
          <el-col v-for="(item,index) in cities" :key="index" :span="2" style="margin-bottom:15px">
            <el-button :icon="item" @click="selectIcon(item)"></el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="系统图标" name="second">
        <el-row>
          <el-col
            v-for="(item,index) in citiesTwo"
            :key="index"
            :span="2"
            style="margin-bottom:15px"
          >
            <el-button :icon="item" @click="selectIcon(item)"></el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="childAdd">确 认</el-button>
      <el-button @click="childCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import iconList from "@/components/iconList.js";
export default {
  name: "iconList",
  props: {
    iconDialog: {
      type: Boolean,
      default: true
    },
    icontitleText: {
      type: String,
      default: "新增"
    }
  },
  data() {
    return {
      activeName: "first",
      showIconDialog: this.iconDialog,
      cities: iconList[0].list,
      citiesTwo: iconList[1].list,
      iconName: ""
    };
  },
  methods: {
    selectIcon(city) {
      this.iconName = city;
    },
    childAdd() {
      this.$emit("child-add", this.iconName);
    },
    //取消
    childCancel(menuForm) {
      this.$emit("child-cancel");
    }
  },
  watch: {
    iconDialog(val) {
      this.showIconDialog = val; //②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
    },
    showIconDialog(val) {
      this.$emit("on-result-change", val); //③组件内对myResult变更后向外部发送事件通知
    }
  }
};
</script>

<style lang="scss" scoped>
</style>