import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
Vue.use(Vuex);
const state = {
  userInfo: {},
};
const mutations = {
  redirectPage(state, payload) {
    router.push({ path: payload });
  },
  setUserInfo(state) {
    state.userInfo = { ...JSON.parse(localStorage.getItem("userInfo")) };
  },
};
const actions = {
  redirectPage({ commit }, val) {
    commit("redirectPage", val);
  },
};
const getters = {
  getUserInfo: (state) => {
    return state.userInfo;
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
