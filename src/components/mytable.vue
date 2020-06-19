<template>
  <div id="my_form_container" ref="container">
    <tableColumn
      :tableColumnVisible="dialogFilterColumn.visible"
      :tableColumnData="option.column"
      @tableColumnDialogClose="filterColumnClose"
      @tableColumnCheckboxChange="filterColumnChange"
    ></tableColumn>
    <el-row :gutter="20" type="flex">
      <el-col :span="12">
        <div class="menu_left">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="onNew"
            size="mini"
            v-show="option.newBtn"
          >新增</el-button>
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            @click="onMultiDel"
            v-show="option.multiDelBtn"
          >删除</el-button>
          <slot name="menuLeft"></slot>
        </div>
      </el-col>
      <el-col :span="12" align="right">
        <div class="menu_right">
          <slot name="menuRight"></slot>
          <el-tooltip class="item" effect="dark" content="显隐" placement="top">
            <el-button icon="el-icon-menu" size="mini" circle @click="filterColumn"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查询" placement="top">
            <el-button icon="el-icon-search" size="mini" circle @click="onSearch"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button icon="el-icon-refresh" size="mini" circle @click="refresh"></el-button>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          ref="table"
          :data="data"
          style="cursor:default;"
          :height="contentHeight"
          v-loading="tableLoading"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          highlight-current-row
          border
          @selection-change="selectionChange"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :row-key="option.rowKey"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <template v-for="(item, index) in option.column">
            <el-table-column
              v-if="!item.hide"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              :align="item.align"
              show-overflow-tooltip
              filter-placement="bottom-end"
              :column-key="item.prop"
            >
              <template slot-scope="scope">
                <span v-if="item.slot">
                  <slot :name="item.prop" v-bind="scope.row"></slot>
                </span>
                <span v-else>{{scope.row[item.prop]}}</span>
              </template>
              <template v-for="(childItem,index) in item.children">
                <el-table-column
                  v-if="!childItem.hide"
                  :label="childItem.label"
                  :prop="childItem.prop"
                  :width="childItem.width"
                  show-overflow-tooltip
                  filter-placement="bottom-end"
                  :column-key="childItem.prop"
                  :key="index"
                ></el-table-column>
              </template>
            </el-table-column>
          </template>
          <el-table-column
            v-if="columnOperate.visible"
            :fixed="columnOperate.fixed"
            :label="columnOperate.label"
            :align="columnOperate.align"
            :width="columnOperate.width"
          >
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看" placement="top">
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-view"
                  @click="onView(scope.row, scope.$index)"
                  v-if="option.viewBtn"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit"
                  @click="onEdit(scope.row, scope.$index)"
                  v-if="option.editBtn"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-delete"
                  @click="onDel(scope.row, scope.$index)"
                  v-if="option.delBtn"
                ></el-button>
              </el-tooltip>
              <slot name="menu" v-bind="scope"></slot>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @hideSingleOnPage="hideOnSinglePage"
        :current-page="page.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import tableColumn from "@/components/tableColumn";

export default {
  name: "myTable",
  components: {
    tableColumn
  },
  props: {
    option: {
      column: {
        type: Array,
        default: []
      },
      rowKey: { type: String, default: "id" },
      newBtn: { type: Boolean, default: true },
      viewBtn: { type: Boolean, default: true },
      editBtn: { type: Boolean, default: true },
      delBtn: { type: Boolean, default: true },
      multiDelBtn: { type: Boolean, default: true }
    },
    tableLoading: { type: Boolean, default: false },
    data: { type: Array, default: [] },
    page: {
      type: Object,
      default: () => {
        return {
          total: 0,
          pageSize: 5,
          currentPage: 1
        };
      }
    }
  },
  data() {
    return {
      scopeRow: {
        row: {},
        $index: 0
      },
      contentHeight: 0,
      columnOperate: {
        visible: true,
        label: "操作",
        width: 90,
        fixed: "right",
        align: "center"
      },
      dialogFilterColumn: {
        visible: false
      }
    };
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$refs.table) {
        this.contentHeight = window.innerHeight - 200;
        this.$refs.table.doLayout();
      }
    });
    // 监听窗口大小变化
    let self = this;
    window.onresize = function() {
      self.contentHeight = window.innerHeight - 200;
    };
    this.onLoad(this.page, {});
  },
  methods: {
    onLoad(page, params) {
      this.$emit("on-load", page, params);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.onLoad(this.page, {});
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.onLoad(this.page, {});
    },
    hideOnSinglePage() {
      return this.page && this.page.total <= this.page.pageSize;
    },
    selectionChange(val) {
      this.$emit("selection-change", val);
    },
    onNew() {
      this.$emit("on-new");
    },
    onView(row, index) {
      this.$emit("on-view", row, index);
    },
    onEdit(row, index) {
      this.$emit("on-edit", row, index);
    },
    onDel(row, index) {
      this.$emit("on-del", row, index);
    },
    onMultiDel() {
      this.$emit("on-multi-del");
    },
    toggleSelection() {
      if (this.$refs.table) {
        this.$refs.table.clearSelection();
      }
    },
    onSearch() {
      this.$emit("on-search");
    },
    refresh() {
      this.onLoad(this.page, {});
    },
    filterColumn() {
      this.dialogFilterColumn.visible = true;
    },
    filterColumnClose() {
      this.dialogFilterColumn.visible = false;
    },
    filterColumnChange(tableColumnChecked) {
      this.option.column.forEach(column => {
        if (tableColumnChecked.includes(column.prop)) {
          column.hide = false;
        } else {
          column.hide = true;
        }
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
#my_form_container {
  padding-top: 20px;
}

#my_form_container .el-row {
  padding: 0px 10px 10px;
}

#my_form_container .page {
  height: 40px;
}

#my_form_container .page .el-pagination {
  position: fixed;
  right: 10px;
  bottom: 5px;
}
</style>