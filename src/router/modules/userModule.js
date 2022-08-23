/*
 * @Author: along
 * @Description:
 * @Date: 2022-08-16 16:13:58
 * @LastEditors: along
 * @LastEditTime: 2022-08-19 14:02:28
 * @FilePath: /wl-cli/src/router/modules/userModule.js
 */
export default [
  {
    path: '/project/index',
    name: 'ProjectIndex',
    alwaysShow: true,
    component: () =>
      import('@/views/project/index'),
    meta: {
      keepAlive: true, // 是否缓存组件
      title: '' // 路由中文名称
    }
  },
  {
    path: '/project/test',
    name: 'Projecttest',
    alwaysShow: true,
    component: () =>
      import('@/views/project/test'),
    meta: {
      keepAlive: true, // 是否缓存组件
      title: '' // 路由中文名称
    }
  }
];
