import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginInfo: JSON.parse(window.sessionStorage.getItem('token')) || {
      token: null
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
