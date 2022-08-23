<!--
 * @Author: along
 * @Description: 项目入口
 * @Date: 2022-07-18 17:34:53
 * @LastEditors: along
 * @LastEditTime: 2022-08-19 13:52:39
 * @FilePath: /wl-cli/src/views/index.vue
 -->
<template>
  <div class="container">
    <a-layout>
      <!-- 顶部导航栏 -->
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout class="ant-main">
        <!-- 左侧菜单栏 -->
        <a-layout-sider :width="!collapsed ? '230px' : '80px'">
          <Menu />
        </a-layout-sider>
        <!-- 内容展示区 -->
        <a-layout-content>
          <div class="flew flew-column h-100">
            <div class="content flex-auto">
              <router-view />
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Header from '@/components/index/header.vue';
  import Menu from '@/components/index/menu.vue';
  export default {
    components: {
      Header,
      Menu,
    },
    watch: {
    },
    computed: {
      ...mapState({
        collapsed: (state) => state.app.collapsed,
        navValue: (state) => state.user.navValue
      })
    },
    mounted() { },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>
  // 所有子文件默认为flex布局，从上向下排列
  .container {
  	flex: 1;
  	overflow: hidden;
  	box-sizing: border-box;
  	display: flex;
  	flex-direction: column;
  	.ant-layout {
  		flex: 1;
  		height: 100%;
  	}
  	.ant-layout-header {
  		height: 58px;
  		display: flex;
  		align-items: center;
  		padding: 0;
  	}
  	.ant-main {
  		flex: 1;
  		display: flex;
  		flex-direction: row;
  		.ant-layout-sider {
  			flex: 1;
  		}

  		.ant-layout-content {
  			flex: 1;
  			background: #f7f7f7f7;
  			display: flex;
  			flex-direction: column;
  			overflow: hidden;
  			height: calc(100vh - 58px);
  		}
  	}
  }
</style>
