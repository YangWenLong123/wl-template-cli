<!--
 * @Author: along
 * @Description: 项目信息展示
 * @Date: 2022-07-20 16:42:21
 * @LastEditors: along
 * @LastEditTime: 2022-07-27 16:16:11
 * @FilePath: /dm_write/src/components/index/project.vue
 -->
<template>
  <div class="project">
    <div class="project_left">
      <i
        class="iconfont dm-zhediecaidan"
        @click="handleSetCollapsed()"
      ></i>
      <p :style="{marginLeft: '6px'}">方案编号：</p>
      <p :style="{color: '#1890ff'}">{{ projectInfo.schemeNo }}</p>
      <p :style="{marginLeft: '16px'}">项目简称：</p>
      <p
        :style="{color: '#1890ff'}"
        class="shortName"
      >
        <a-tooltip placement="top">
          <template slot="title">
            <span>{{ projectInfo.shortName }}</span>
          </template>
          <a-button
            type="link"
            class="aButtonElipsis"
          >{{ projectInfo.shortName }}</a-button>
        </a-tooltip>
      </p>

    </div>

    <a-button
      type="link"
      @click="handleHome()"
      :style="{marginRight: '10px'}"
      class="project_link"
    >
      返回项目列表
    </a-button>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: 'Project',
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        projectInfo: (state) => state.user.projectInfo,
        collapsed: (state) => state.app.collapsed
      })
    },
    mounted() { },
    methods: {
      /**
       * @description 是否折叠菜单
       */
      handleSetCollapsed() {
        this.$store.commit('app/SET_COLLAPSED', !this.collapsed);
      },

      handleHome() {
        this.$store.commit('user/SET_NAV_VALUE', 'project');
        this.$store.commit('app/SET_SELECT_KEYS', '');
        this.$store.commit('app/SET_OPEN_KEYS', '');
        this.$router.push({ path: '/' });
      }
    },
  };
</script>

<style lang="scss" scoped>
  .project {
    width: 100%;
    height: 38px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px #e8e8e8 solid;
    overflow: hidden;
    .project_left {
      display: flex;
      align-items: center;
    }
    .dm-zhediecaidan {
      color: #333;
      cursor: pointer;
      margin: 0 10px 0 10px;
      position: relative;
      top: -1px;
      &:hover {
        color: #1890ff;
      }
    }
    .home {
      margin: 0 6px 0 6px;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
    p {
      margin-bottom: 0px;
      color: #333;
      font-size: 14px;
      white-space: nowrap;
    }
    .project_link {
      &:hover {
        text-decoration: underline;
      }
    }
    .shortName {
      width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>