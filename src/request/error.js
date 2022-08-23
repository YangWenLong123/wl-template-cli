import { message } from 'ant-design-vue';

export function errorHandler(response = {}) {
	const { data, status } = response;
	const re = {
		is_over: true,
		res: response,
	};

	if (status !== 200) {
		// Token 过期 返回公共平台
		if (status === 401) {
			localStorage.clear();
			sessionStorage.clear();
			location.href = process.env.VUE_APP_PLATFORM;
		}

		re.is_over = false;
	}
	if (data.code !== 1) {
		re.is_over = false;
	}

	return re;
}

export function setErrorMessage(data = {}) {
	message.error(data.message, 3);
}
