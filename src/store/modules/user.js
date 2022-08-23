/*
 * @Author: along
 * @Description:用户信息存储，包含(token，菜单，用户信息等)
 * @Date: 2022-07-14 13:19:57
 * @LastEditors: along
 * @LastEditTime: 2022-07-22 09:04:38
 * @FilePath: /dm_write/src/store/modules/user.js
 */

const state = {
  userInfo: {}, // 用户信息
  token: '', // token
  menus: [], //菜单 处理完成
  thirdInfo: {}, //登录信息 { code, url }
};

const mutations = {
  // 设置用户信息
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },

  // 设置token
  SET_TOKEN: (state, token) => {
    console.log('token设置成功');
    state.token = token;
  },

  // 设置菜单
  SET_MENU: (state, menus) => {
    state.menus = menus;
  },

  // 存储登录携带code和url
  SET_THIRDINFO: (state, thirdInfo) => {
    state.thirdInfo = thirdInfo;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
