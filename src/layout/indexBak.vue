<template>
  <!-- 方案1 -->
  <!-- <div class="layout-container">
    <page-header></page-header>
    <router-view></router-view>
  </div> -->
  <div class="layout-container">
    <page-header></page-header>
    <router-view></router-view>
  </div>
  <!-- 方案2 -->
  <!-- <dv-full-screen-container :style="paddingBottomStyle" class="layout-container">
    <page-header></page-header>
    <router-view></router-view>
  </dv-full-screen-container> -->
</template>
<script>
import {mapActions} from 'vuex';
import rem from '@/util/rem';
rem(1920);
import PageHeader from './PageHeader';
import $ from 'jquery';
export default {
  name: "Layout",
  components: {PageHeader},
  data() {
    return {
      height: 80
    };
  },
  computed: {
    paddingBottomStyle() {
      return `padding-bottom: ${this.height}px`;
    }
  },
  async created() {
    try {
      // 方案2
      let height = window.outerHeight - window.innerHeight;
      this.height = height;

      // 方案1
      await this.$nextTick();
      await this.getAllDictList();
      // this.init();
      // this.resizeFull();
      // $(window).on('resize', this.resizeFull);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions({
      getAllDictList: 'dict/getAllDictList'
    }),
    // 方案1全屏展示
    init() {
      let viewport = document.getElementById('myViewport');
      viewport.setAttribute('content', `width=${window.screen.width},initial-scale=1`);
      $('body').width(window.screen.width);
      $('body').height(window.screen.height);
      if ($('#farm-map').length === 1) {
        $('#farm-map').css({
          transform: "scale(" + 1 + ", " + 1 + ")",
          transformOrigin: "left top",
        });
      }
    },
    resizeFull() {
      var ratioX = $(window).width() / $('body').width();
      var ratioY = $(window).height() / $('body').height();
      $('body').css({
        transform: "scale(" + ratioX + ", " + ratioY + ")",
        transformOrigin: "left top",
        backgroundSize: "100% " + ratioY * 100 + "%",
      });
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