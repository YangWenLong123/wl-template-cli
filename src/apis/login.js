/*
 * @Author: along
 * @Description: 登录相关接口
 * @Date: 2022-08-16 14:28:54
 * @LastEditors: along
 * @LastEditTime: 2022-08-19 13:49:47
 * @FilePath: /wl-cli/src/apis/login.js
 */
import { post } from '@/request/axios';

// 获取公共平台数据
export function verificationTokenLogin({ params, data, headers }) {
  return post({
    url: '/api/',
    params,
    data,
    headers,
  });
}

// 退出登录
export function logoutLogin({ params, data, headers }) {
  return post({
    url: '/api/',
    params,
    data,
    headers,
  });
}
