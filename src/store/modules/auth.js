// 物理环境设备
const state = {
  user: {}
};

const getters = {
  user() {
    return state.user;
  }
};

const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
}

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
