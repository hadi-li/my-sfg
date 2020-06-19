import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') || '',
    menuItems: [
      {
        name: "首页",
        id: "-1",
        icon: "el-icon-picture-outline-round",
        url: "/home",
        children: []
      },
      {
        name: "用户",
        id: "20",
        icon: "el-icon-message-solid",
        url: "/user",
        children: []
      },
      {
        name: "测试1",
        id: "1",
        icon: "el-icon-s-claim",
        url: "",
        children: [
          {
            id: "4",
            parentid: 1,
            name: "测试1-1",
            icon: "el-icon-chat-dot-round",
            url: "/test",
            children: []
          },
          {
            id: "5",
            parentid: 1,
            name: "测试1-2",
            icon: "el-icon-shopping-cart-1",
            url: "/test3",
            children: []
          }
        ]
      },
      {
        name: "测试2",
        id: "2",
        icon: "el-icon-menu",
        url: "",
        children: [
          {
            id: "6",
            parentid: 2,
            name: "测试2-1",
            icon: "el-icon-folder-checked",
            url: "/test5",
            children: []
          },
          {
            id: "7",
            parentid: 2,
            name: "菜单",
            icon: "el-icon-folder-remove",
            url: "/menu",
            children: []
          }
        ]
      },
      {
        name: "测试3",
        id: "3",
        icon: "el-icon-monitor",
        url: "/test9",
        children: []
      }
    ],
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', 'Bearer ' + user.Authorization);
    },
    setMenus(state, items) {
      state.menuItems = [...items]
    },
  },
  actions: {},
  modules: {}
})