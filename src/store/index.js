import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user
  },

  state: {
    serverURL: 'http://localhost:8000',
  },

  mutations: {
  },

  actions: {
  },

  getters: {
    serverURL(state) {
      return state.serverURL
    },
  }

})
