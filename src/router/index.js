/*
 * @Author: along
 * @Description: 路由配置
 * @Date: 2022-07-14 16:29:40
 * @LastEditors: along
 * @LastEditTime: 2022-08-19 13:59:50
 * @FilePath: /wl-cli/src/router/index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import StatusError from '@/views/error';
import index from '@/views/index';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 加载所有模块子路由
const requireContext = require.context('./modules', false, /\.js$/);
const allRouterModules = [];
requireContext.keys().forEach((name) => {
  allRouterModules.push(...(requireContext(name).default || []));
});

const routes = [
  {
    path: '/', // 项目列表
    name: 'Index',
    component: () => import('@/views/index'),

  },
  {
    path: '/project', // 首页
    name: 'Index',
    component: () => import('@/views/index'),
    children: [
      ...allRouterModules // 注入所有的路由模块
    ]
  },
  {
    path: '/404', // 状态错误页面
    name: 'StatusError',
    component: StatusError
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const createRouter = () => {
  const _r = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

  return _r;
};

const router = createRouter();

export const resetRouter = () => {
  const newRouter = createRouter();
  router && (router.matcher = newRouter.matcher);
};

export const moduleRouter = () => {
  return {
    allRouterModules: allRouterModules
  };
};

export default router;
