import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as box from '@/store/modules/box.js'
import * as card from '@/store/modules/card.js'
import * as session from '@/store/modules/session.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user,
    box,
    card,
    session
  },

  state: {
    serverURL:  process.env.VUE_APP_SERVER_URL,
    perPage:    process.env.VUE_APP_PER_PAGE,
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
