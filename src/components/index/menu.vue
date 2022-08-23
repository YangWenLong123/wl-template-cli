<template>
  <div class="menuDm">
    <a-layout-sider v-model="collapsed">
      <!-- {{ MENU }} -->
      <a-menu
        :open-keys="openKeys"
        :selected-keys="selectedKeys"
        mode="inline"
        theme="light"
        :inline-collapsed="collapsed"
        :inline-indent="30"
        :style="{width: !collapsed ? '230px' : '80px'}"
        @openChange="onOpenChange"
        @select="handleSelect"
      >
        <a-sub-menu
          v-for="(row) in MENU"
          :key="row.path"
        >
          <span slot="title">
            <i
              class="icon iconfont"
              :class="row.meta.icon"
            />
            <span>{{ row.name }}</span>
          </span>

          <template v-if="row.children.length">
            <a-menu-item
              v-for="(option) in row.children"
              :key="option.path"
              class="ant-children-item"
            >
              {{ option.name }}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'Menu',
    components: {},
    data() {
      return {
        MENU: [], //渲染菜单
      };
    },
    computed: {
      ...mapState({
        menus: (state) => state.user.menus,
        collapsed: (state) => state.app.collapsed,
        openKeys: (state) => state.app.openKeys,
        selectedKeys: (state) => state.app.selectedKeys,
      })
    },
    watch: {
      navValue() {
        this.handleRestMenu(this.menus.routers);
      }
    },
    mounted() {
      console.log('menus', this.menus);

      this.handleRestMenu(this.menus.routers);
    },
    methods: {
      /**
       * @description 选择菜单
       */
      handleSelect(item) {
        console.log('click menu', item);

        this.$store.commit('app/SET_SELECT_KEYS', item.key);

        this.$router.push({ path: item.key });
      },

      /**
       * @description 查询当前tab下的菜单
       *
       */
      async handleRestMenu(menu = []) {
        const value = JSON.parse(JSON.stringify(menu));

        this.MENU = value;

        if (!this.selectedKeys.length || !this.openKeys.length) {
          if (this.MENU.length) {
            await this.$store.commit('app/SET_OPEN_KEYS', this.MENU[0]['path']);

            if (this.MENU[0]['children'].length) {
              await this.$store.commit('app/SET_SELECT_KEYS', this.MENU[0]['children'][0]['path']);
            }
          }
        }

        console.log('当前tab路由', this.MENU, this.$route.path);
      },

      /**
       * @description 监听菜单展开
       */
      onOpenChange(keys) {
        if (keys.length !== 0) {
          if (keys.length === 1) {
            this.$store.commit('app/SET_OPEN_KEYS', keys[0]);
          } else {
            this.$store.commit('app/SET_OPEN_KEYS', keys[keys.length - 1]);
          }
        } else {
          this.$store.commit('app/SET_OPEN_KEYS', '');
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .menuDm {
  	height: 100%;
  	.iconfont {
  		font-size: 18px;
  		margin-right: 30px;
  	}
  }
</style>
<style lang="scss">
  .menuDm {
  	overflow: hidden;
  	border-right: 1px #e8e8e8 solid;
  	.ant-children-item {
  		padding-left: 80px !important;
  	}
  	.ant-menu-inline,
  	.ant-menu-vertical,
  	.ant-menu-vertical-left {
  		border-right: none;
  	}
  }
</style>
