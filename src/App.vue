<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </a-config-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        zhCN
      };
    },
    computed: {
      ...mapState({
      })
    }
  };
</script>

<style lang="scss">
  @import url('@/assets/styles/index.scss');
</style>
