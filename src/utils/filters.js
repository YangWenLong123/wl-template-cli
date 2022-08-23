/*
 * @Author: along
 * @Description: 全局过滤器
 * @Date: 2022-08-04 11:19:15
 * @LastEditors: along
 * @LastEditTime: 2022-08-11 14:29:47
 * @FilePath: /dm_write/src/utils/filters.js
 */
import Vue from 'vue';
import { dateFormat } from './index.js';

function dateFormatter(date, formatter) {
  if (date) {
    return dateFormat(date, formatter);
  } else {
    return '--';
  }
}

Vue.filter('dateFormatter', dateFormatter);
