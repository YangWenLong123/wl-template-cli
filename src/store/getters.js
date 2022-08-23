/*
 * @Author: along
 * @Description:
 * @Date: 2022-08-16 14:36:40
 * @LastEditors: along
 * @LastEditTime: 2022-08-19 13:36:25
 * @FilePath: /wl-cli/src/store/getters.js
 */
const getters = {
  token: (state) => state.user.token,
  interceptor: (state) => state.app.interceptor
};

export default getters;
