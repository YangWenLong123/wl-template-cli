/**
 * @description 登录文件
 */

import store from '../store';
import { verificationTokenLogin } from '@/apis/login';
import router, { resetRouter } from '@/router';
import Vue from 'vue';

import { data } from './resource.js';

/**
 * @param {String} code  运营平台获取登录code,获取路由等
 * @returns
 */
const createThirdLogin = (code) => {
  return new Promise((resolve, reject) => {
    thirdSetLogin({ code })
      .then(() => {
        //登录成功
        loginSuccess();
        resolve();
      })
      .catch((err) => {
        loginFail(err);
        reject();
      });
  });
};

/**
 * @description 获取用户菜单信息，处理动态路由，缓存
 * @param {object} query 登录的参数
 * */
const thirdSetLogin = (query) => {
  return new Promise(async (resolve, reject) => {
    let resource = [];

    const re = await getLoginData(query);

    console.log(re, 're');

    if (re.code === 1) {
      // store.commit('user/SET_THIRDINFO', { info: query, last_url: document.referrer }); //缓存数据
      // store.commit('user/SET_TOKEN', re.data.dm_token);
      // store.commit('user/SET_USERINFO', re.data.userInfo);

      resource = re.data.resource || [];

      if (!resource.length) {
        Vue.prototype.$message.error('当前配置资源为空，请返回企业运营中心配置！');
        location.href = process.env.VUE_APP_PLATFORM;
        return false;
      }
    } else {
      Vue.prototype.$message.error('项目登录错误，请稍后重试！');
      location.href = process.env.VUE_APP_PLATFORM;
      return false;
    }

    console.log('###路由资源###', resource);

    const resultRouter = await setResource(resource); //获取解析后路由

    store.commit('user/SET_MENU', resultRouter);

    console.log('###最终的路由###', resultRouter);

    resolve({});
  });
};

/**
 * @description 登录失败
 */
const loginFail = () => {
  setTimeout(() => {
    location.href = process.env.VUE_APP_PLATFORM;
  }, 1500);
};

/**
 * @description 登录成功
 */
const loginSuccess = (path) => {
  // TODO

  location.href = '/project/index'  //test
};

/**
 * @description 从运营平台code获取相关数据
 * @param {*} query
 */
const getLoginData = (query) => {
  return new Promise((resolve, reject) => {
    resolve(data)

    // verificationTokenLogin(query)
    //   .then((response) => {
    //     if (response.code === 0) {
    //       loginFail();
    //     } else if (response.code === 1) {
    //       resolve(response);
    //     }
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  });
};

/**
 * @description 设置动态路由
 * @param {*} data  运营平台返回的路由资源resource
 * @returns 过滤后路由菜单
 */
const setResource = async (resource) => {
  let accessRoutes = [];

  accessRoutes = await generateThirdRoutes(resource);

  console.log('###解析后路由###', accessRoutes);
  resetRouter();
  router.addRoutes(accessRoutes);
  router.addRoutes([{ path: '*', redirect: '/404', hidden: true }]);

  return { routers: accessRoutes };
};

/**
 * @description 根据服务端返回路由解析生成本地可识别的路由
 * @param {Array} resource  服务端返回路由
 * @return 返回当前用户权限路由
 *    resType： resourceType.03" 按钮 "resourceType.03" 菜单 resourceType.02 目录 resourceType.1 应用
 */
const generateThirdRoutes = async (resource) => {
  const menus_types = ['resourceType.01', 'resourceType.02', 'resourceType.03'];
  const re = [];

  function fn(resource, list) {
    resource.sort(function (a, b) {
      return a.sort - b.sort;
    });
    resource.forEach((v) => {
      const children = [];
      const v_children = v.children || [];

      if (menus_types.includes(v.resType)) {

        // v.routePath 必须有值 没有爆出异常
        if (!v.routePath) {
          throw new Error('资源路径不可为空');
        }
        const item = {
          path: v.component.trim(),
          name: v.name,
          projectResource: v.projectResource || 0, // 是否是项目内资源
          permission: v.permission,
          component: getComponent(v.routePath),
          meta: {
            title: v.name,
            icon: v.icon
          },
          children: children
        };

        list.push(item);
      }
      if (v_children.length) {
        fn(v_children, children);
      }
    });
  }

  fn(resource, re);
  return re;
};

/**
 * @description 根据平台返回的路径信息 获取对应组件
 * @param {String} path 路径
 * @return {object} re 组件信息
 *    例： path = 'views/edc_project/projectSelect/index'
 *
 * */
const getComponent = (path) => {
  if (path === '/view/index.vue') return '';
  path = path.slice(1) || '';
  const path_arr = path.split('/');
  const path_arr_last = path_arr[path_arr.length - 1];
  if (path_arr_last.includes('.vue')) {
    path_arr[path_arr.length - 1] = path_arr_last.replace('.vue', '');
  }
  const name = path_arr.join('/');
  const re = require('@/' + name + '.vue').default;
  return re;
};


export { createThirdLogin, getLoginData, loginFail, loginSuccess, setResource, generateThirdRoutes };
