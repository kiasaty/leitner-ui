import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as box from '@/store/modules/box.js'
import * as card from '@/store/modules/card.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user,
    box,
    card
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
