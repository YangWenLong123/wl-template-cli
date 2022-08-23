import Vue from 'vue';
import App from './App.vue';
import './utils/premisssion';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './utils/filters';
import './components/index';

import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
