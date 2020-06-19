<template>
  <div class="menu">
    <main>
      <div class="menu_left">
        <div class="logo-con">
          <div class="title" v-show="!collapse">
            <span class="title__sider-title is-active">{{logo}}</span>
          </div>
          <div class="title" v-show="collapse">
            <span class="title__sider-title el-tag--mini">LG</span>
          </div>
        </div>
        <el-menu
          :background-color="backgroundColor"
          :text-color="textColor"
          :default-active="$route.meta.pageId"
          :collapse="collapse"
        >
          <template v-for="item in list">
            <router-link :to="item.url" :key="item.id" v-if="item.children.length===0">
              <el-menu-item :index="item.id+''">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </router-link>
            <subMenu v-else :data="item" :key="item.id"></subMenu>
          </template>
        </el-menu>
      </div>
      <div class="menu_right">
        <header>
          <span>展开</span>
          <span>MYSFG</span>
          <span>退出登陆</span>
        </header>
        <div class="menu_right_content">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import subMenu from "./submenu.vue";
export default {
  name: "menuList",
  components: {
    subMenu
  },
  data() {
    return {
      collapse: false, //是否折叠
      list: this.$store.state.menuItems, //当行菜单数据源
      backgroundColor: "#304156", //导航菜单背景颜色
      textColor: "#BFCBD9", //导航菜单文字颜色
      logo: "LOGO" //logo
    };
  }
};
</script>

<style lang="less" scoped>
header {
  height: 60px;
  line-height: 40px;
  background: #ccc;
  display: flex;
  justify-content: space-between;
  span {
    margin: 10px;
  }
}
main {
  display: flex;
}
.menu_left {
  width: 20%;
  background: rgb(48, 65, 86);
  height: 100vh;
}
.menu_right {
  width: 80%;
  background: #eeeeee;
}
.menu_right_content {
  width: 99%;
  margin-left: 0.5%;
  background: white;
  margin-top: 5px;
}
.el-menu {
  border-right: none;
  a {
    text-decoration: none;
  }
}
.logo-con {
  height: 64px;
  padding: 10px;
  .title {
    position: relative;
    text-align: center;
    font-size: 20px;
    height: 64px;
    line-height: 64px;
    span {
      padding: 0 5px 0 0;
      color: #409eff;
      font-size: 20px;
    }
  }
}
</style>