/**
 * @description 下载
 * */
export function getFileName(disposition) {
	disposition = decodeURIComponent(disposition);
	const str_arr = disposition.split(';');
	let str = str_arr[str_arr.length - 1];
	str = str.replace(/\*|UTF-8|'/g, '');
	str = str.match(/filename=(.*)/)[1];
	return str;
}

/**
 * @description 获取url参数
 * @param {*} url
 * @returns
 */
export const getUrlParamsUtils = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      // eslint-disable-next-line no-sequences
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );


/**
 * 日期格式化
 * @param date Date 目标日期对象/String 日期对应字符串/ Number: 时间戳(精确到毫秒)
 *        String fmt 指定格式字符串月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)可以用 1-2 个占位符、年(y)可以用 1-4 个占位符、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @return Boolean
 */
export function dateFormat(dateTmp, fmtTmp) {
  let fmt = fmtTmp;
  let date = dateTmp;

  if (!fmt) {
    fmt = 'yyyy.MM.dd';
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  let week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}