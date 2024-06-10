const state = {
  user: null,
};

const getters = {
  user: (state) => state.user,
  isLoggedIn: (state) => !!state.user,
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
