/*
 * @Author: along
 * @Description: 处理单点登录，动态路由，用户权限
 * @Date: 2022-07-18 17:34:53
 * @LastEditors: along
 * @LastEditTime: 2022-08-19 14:05:30
 * @FilePath: /wl-cli/src/utils/premisssion.js
 */

import store from '@/store';
import router from '@/router';

import NProgress from 'nprogress';
import "nprogress/nprogress.css";

import { getUrlParamsUtils } from '@/utils';
import { createThirdLogin } from './login';

NProgress.configure({
  easing: 'ease',//调整动画设置和速度ms
  speed: 500,
  trickle: true, //关闭进度条步进，设置 trickle 为 false。
  showSpinner: false,//禁用进度环
  trickleRate: 0.02,//每次步进增长多少
  trickleSpeed: 200,//步进间隔ms
  minimum: 0.1 //来修改最小百分比
});

// 路由前置守卫
router.beforeEach(async (to, form, next) => {
  NProgress.start();//开始
  const params = getUrlParamsUtils(location.href);
  const isPublicPlatform = !!params.code && location.pathname === '/'; // 是否从公共平台跳转过来

  if (isPublicPlatform && store.getters.interceptor) {
    const { code } = { ...params };
    createThirdLogin(code).then(() => {
      next();
    });
    return false;
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();//结束
});
