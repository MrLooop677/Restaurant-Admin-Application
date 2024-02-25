import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
Vue.use(Vuex);
const state = {};
const getters = {};
const mutations = {
  redirectPage(state, payload) {
    router.push({ path: payload });
  },
};
const actions = {
  redirectPage({ commit }, val) {
    commit("redirectPage", val);
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
