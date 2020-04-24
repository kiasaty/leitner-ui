export const namespaced = true

export const state = {
  sentRequestsCount: 0
}

export const mutations = {
  INCREMENT_SENT_REQUEST_COUNT(state) {
    state.sentRequestsCount++
  },
  DECREMENT_SENT_REQUEST_COUNT(state) {
    state.sentRequestsCount--
  }
}

export const actions = {
  incrementSentRequestCount({ commit }) {
    commit('INCREMENT_SENT_REQUEST_COUNT')
  },
  decrementSentRequestCount({ commit }) {
    commit('DECREMENT_SENT_REQUEST_COUNT')
  },
}

export const getters = {
  isLoading: state => {
    return state.sentRequestsCount > 0
  },
}