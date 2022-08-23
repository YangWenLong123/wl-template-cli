/*
 * @Author: along
 * @Description:
 * @Date: 2022-08-19 13:35:49
 * @LastEditors: along
 * @LastEditTime: 2022-08-19 13:51:17
 * @FilePath: /wl-cli/src/store/modules/app.js
 */
const state = {
  collapsed: false, //是否折叠菜单
  interceptor: true, //路由守卫拦截器是否打开 false: 关闭 true：打开
  openKeys: [],
  selectedKeys: []
};

const mutations = {
  // 是否展开菜单
  SET_COLLAPSED: (state, value) => {
    state.collapsed = value;
  },

  // 设置打开页面
  SET_SELECT_KEYS: (state, value) => {
    state.selectedKeys = value === '' ? [] : [value];
  },

  // 设置打开菜单
  SET_OPEN_KEYS: (state, value) => {
    state.openKeys = value === '' ? [] : [value];
  },

  // 是否打开路由守卫拦截器
  SET_INTERCEPTOR: (state, value) => {
    state.interceptor = value;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
