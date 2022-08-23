/**
 * @description axios请求
 * @auth along
 */

import axios from 'axios';
import Qs from 'qs';
import store from '../store';
import { getFileName } from '@/utils/index';
import { errorHandler, setErrorMessage } from '@/request/error';

/**
 * @desc 自定义axios实例/server
 * @param   {string}       baseURL              //这里可以设置环境变量切换不同环境url
 * @param   {Number}       timeout              //请求超时
 * @param   {String}       method               //请求方法,默认为get
 * @param   {Boolean}      withCredentials      //表示跨域请求是否使用凭证
 */

const server = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 5000,
	method: 'post',
	withCredentials: false,
});

/**
 * 添加请求拦截器,发送请求之前做些什么
 */
server.interceptors.request.use(
	function (config) {
		// 接口请求需要在Headers中携带的参数
		const Token = store.getters.token;

		const apiWhiteList = ['']; //不需要添加Authorization接口

		if (!apiWhiteList.includes(config.url)) {
			config.headers['Authorization'] = 'Bearer ' + Token;
			config.headers['Content-Type'] = 'application/json; charset=utf-8';
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

/**
 * 添加响应拦截器,对响应数据做点什么
 */
server.interceptors.response.use(
	(response) => {
		// 下载文件请求拦截
		if (!response.headers['content-type'].includes('application/json')) {
			const res = response.data;
			const disposition = response.headers['content-disposition'];
			const fileName = getFileName(disposition);

			const blob = new Blob([res], {
				type: response.headers['content-type'],
			});
			if ('download' in document.createElement('a')) {
				const elink = document.createElement('a');
				elink.download = fileName;
				elink.style.display = 'none';
				elink.href = URL.createObjectURL(blob);
				document.body.appendChild(elink);
				elink.click();
				URL.revokeObjectURL(elink.href);
				document.body.removeChild(elink);
			} else {
				navigator.msSaveBlob(blob, fileName);
			}
			return res;
		}

		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);

/**
 * 添加请求超时拦截器
 * @params {Number} retry 尝试请求次数
 * @params {Number} retryDelay 请求间隔时间
 */
server.defaults.retry = 2;
server.defaults.retryDelay = 1000;
server.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
	var config = err.config;

	if (!config || !config.retry) return Promise.reject(err);
	config.__retryCount = config.__retryCount || 0;
	if (config.__retryCount >= config.retry) {
		errorHandler(err.response);
		return Promise.reject(err);
	}
	config.__retryCount += 1;
	var backoff = new Promise(function (resolve) {
		setTimeout(function () {
			resolve();
		}, config.retryDelay || 1);
	});

	return backoff.then(function () {
		return server(config);
	});
});

/**
 * 封装POST方法
 * @param   {String}    url             //url
 * @param   {Object}    params          //params参数
 * @param   {Object}    data            //data参数
 * @param   {Object}    headers         //自定义headers，可覆盖
 * @param   {Function}  errorCallback   //自定义异常处理
 */
export function post({ url, params, data, headers, errorCallback }) {
	return new Promise((resolve, reject) => {
		server
			.post(url, data, {
				params: params,
				headers,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				if (typeof errorCallback == 'function') {
					errorCallback(err);
				} else {
					setErrorMessage(err);
				}
				reject(err);
			});
	});
}

/**
 * 封装GET方法
 * @param   {String}    url                 //url
 * @param   {Object}    params              //参数
 * @param   {Object}    headers             //自定义headers，可覆盖
 * @param   {Function}  errorCallback       //自定义异常处理
 */
export function get({ url, params, headers, errorCallback }) {
	return new Promise((resolve, reject) => {
		server
			.get(url, {
				params: Qs.parse(params),
				headers,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				if (typeof errorCallback == 'function') {
					errorCallback(err);
				} else {
					setErrorMessage(err);
				}
				reject(err);
			});
	});
}

/**
 * 封装DELETE方法
 * @param   {String}    url             //url
 * @param   {Object}    data            //参数
 */
export function del({ url, data }) {
	return new Promise((resolve, reject) => {
		server
			.post(url, data)
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

/**
 * 封装PUT方法
 * @param   {String}    url             //url
 * @param   {Object}    data            //参数
 */
export function put({ url, data }) {
	return new Promise((resolve, reject) => {
		server
			.post(url, data)
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
