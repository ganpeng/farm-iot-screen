import Vue from 'vue';
import dataV from '@jiaminghi/data-view';
import vSelect from "vue-select";
import _ from 'lodash';
import "vue-select/dist/vue-select.css";
import NoData from '@/components/NoData';

import App from './App.vue';
// 路由
import router from '@/router';
// 服务
import service from '@/service';
// vuex
import store from '@/store';
// 初始化svg组件
import './icons';
// 样式
import '@/assets/scss/index.scss';
// 工具方法
import util from '@/util';

// 全局filter
import * as filters from './filter';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// 全局设置store
let user = util.store.getLocal('login');
if (user && user.id) {
  store.commit('auth/setUser', {user});
}

// select下拉箭头
vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: createElement => createElement('span', {'class': { 'select-arrow': true}}),
  },
});

// use
Vue.use(dataV);
Vue.component("v-select", vSelect);
Vue.component('no-data', NoData);

// 全局指令
Vue.directive('dragscroll', {
  inserted: function(el) {
    el.onmousedown = (ev) => {
      const disX = ev.clientX;
      // const disY = ev.clientY;
      const originalScrollLeft = el.scrollLeft;
      // const originalScrollTop = el.scrollTop;
      const originalScrollBehavior = el.style['scroll-behavior'];
      const originalPointerEvents = el.style['pointer-events'];
      el.style['scroll-behavior'] = 'auto';
      // 鼠标移动事件是监听的整个document，这样可以使鼠标能够在元素外部移动的时候也能实现拖动
      document.onmousemove = (ev) => {
        ev.preventDefault();
        const distanceX = ev.clientX - disX;
        // const distanceY = ev.clientY - disY;
        el.scrollTo(originalScrollLeft - distanceX, 0);
        // el.scrollTo(originalScrollLeft - distanceX, originalScrollTop - distanceY);
        // 由于我们的图片本身有点击效果，所以需要在鼠标拖动的时候将点击事件屏蔽掉
        el.style['pointer-events'] = 'none';
      }
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        el.style['scroll-behavior'] = originalScrollBehavior;
        el.style['pointer-events'] = originalPointerEvents;
      }
    }
  }
});

Vue.config.productionTip = false;
Vue.prototype.$util = util;
Vue.prototype.$service = service;
Vue.prototype.$_ = _;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
