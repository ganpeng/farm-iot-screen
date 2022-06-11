import Vue from 'vue';
import Vuex from 'vuex';
import dict from './modules/dict';
import farm from './modules/farm';
import auth from './modules/auth';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dict,
    farm,
    auth
  }
});

export default store
