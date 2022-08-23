<!--
 * @Author: along
 * @Description: DM Header
 * @Date: 2022-07-18 10:21:21
 * @LastEditors: along
 * @LastEditTime: 2022-08-12 15:39:20
 * @FilePath: /dm_write/src/components/index/header.vue
 -->
<template>
  <div class="header">
    <div
      class="left"
      :style="{ paddingLeft: '20px' }"
    >
      <div class="title">系统名称</div>
    </div>
    <div class="right">
      <span class="iconfont dm-touxiang" />
      <a-dropdown>
        <a
          class="ant-dropdown-link"
          @click="(e) => e.preventDefault()"
        >
          {{ userInfo | filterNams }}
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <span @click="handleBackWorkBench()">返回工作台</span>
          </a-menu-item>
          <a-menu-item key="1">
            <span @click="handleLogout()">退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { logoutLogin } from '@/apis/login';
  export default {
    name: 'Header',
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        userInfo: (state) => state.user.userInfo,
        menus: (state) => state.user.menus
      })
    },
    filters: {
      // 显示权重 user_name > email > mobile
      filterNams(val) {
        if (val.user_name) return val.user_name;
        if (val.email) return val.email;
        if (val.mobile) return val.mobile;
      }
    },
    watch: {},
    mounted() { },
    methods: {
      /**
       * @description 返回公共平台
       */
      handleBackWorkBench() {
        if (process.env.VUE_APP_PLATFORM) {
          localStorage.clear();
          sessionStorage.clear();
          location.href = process.env.VUE_APP_PLATFORM;
        }
      },

      /**
       * @description 退出登录
       */
      handleLogout() {
        localStorage.clear();
        sessionStorage.clear();

        logoutLogin().then(resp => {
          if (resp.code === 1) {
            location.href = resp.data;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header {
  	width: 100%;
  	display: flex;
  	align-items: center;
  	justify-content: space-between;
  	box-sizing: border-box;
  	height: 58px;
  	min-height: 58px;
  	background: #1890ff;
  	color: #fff;
  	overflow: hidden;
  }
  .left {
  	display: flex;
  	align-items: center;
  	box-sizing: border-box;
  	.title {
  		color: #ffffff;
  		font-size: 19px;
  		font-weight: 500;
  	}
  	.nav {
  		display: flex;
  		margin-left: 300px;
  		cursor: pointer;
  		position: relative;
  		overflow: hidden;
  		.nav-label {
  			width: 120px;
  			height: 58px;
  			font-size: 15px;
  			text-align: center;
  			line-height: 58px;
  		}
  		.nav-active {
  			background: #ffffff;
  			color: #1d7dfa;
  			position: relative;
  			height: 58px;
  			width: 120px;
  			&::before {
  				content: '';
  				position: absolute;
  				left: 0;
  				bottom: 0;
  				width: 120px;
  				height: 2px;
  				background: #1d7dfa;
  			}
  		}
  	}
  }
  .right {
  	display: flex;
  	align-items: center;
  	padding-right: 32px;
  	.dm-touxiang {
  		font-size: 24px;
  		color: #ffffff;
  		margin-right: 6px;
  	}
  	a {
  		color: #ffffff;
  	}
  	i {
  		display: none !important;
  	}
  }
</style>
