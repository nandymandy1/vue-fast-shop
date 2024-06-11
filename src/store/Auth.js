import { sleepInDev } from "@/utils/useTimer";
import { AUTH_TYPES } from "./Types";

const state = {
  user: null,
};

const getters = {
  user: (state) => state.user,
  isLoggedIn: (state) => !!state.user,
};

const actions = {
  async loginUser({ commit }, { username, password }) {
    if (username !== "admin") {
      throw new Error("Incorrect username");
    }
    if (password !== "password") {
      throw new Error("Incorrect password");
    }
    await sleepInDev(4);
    commit(AUTH_TYPES.LOGIN_USER, {
      username,
      email: "test@example.com",
      id: window.crypto.randomUUID(),
    });
  },
};

const mutations = {
  [AUTH_TYPES.LOGIN_USER]: (state, user) => {
    state.user = user;
  },
  [AUTH_TYPES.LOGOUT_USER]: (state) => {
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
