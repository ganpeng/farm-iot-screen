<template>
  <div class="layout-container">
    <page-header></page-header>
    <router-view></router-view>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import rem from '@/util/rem';
rem(1920);
import PageHeader from './PageHeader';
const screenfull = require('screenfull');
export default {
  name: "Layout",
  components: {PageHeader},
  data() {
    return {};
  },
  async created() {
    try {
      // 方案1
      await this.$nextTick();
      await this.getAllDictList();
      this.bindEvents();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions({
      getAllDictList: 'dict/getAllDictList'
    }),
    bindEvents() {
      window.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          if (screenfull.isEnabled) {
            screenfull.toggle();
          }
        }
      }, false);
    }
  }
};
</script>
<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #0A0C22;
}
</style>