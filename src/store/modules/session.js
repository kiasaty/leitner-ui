import SessionService from '@/services/SessionService.js'

export const namespaced = true

export const state = {
  card: {},
}

export const mutations = {
  SET_CARD(state, card) {
    state.card = card
  }
}

export const actions = {
  start(boxID) {
    return SessionService.start(boxID)
      .then(
        //
      )
      .catch(error => {
        throw error
      })
  },
  next({ commit }, boxID) {
    return SessionService.next(boxID)
      .then(response => {
        commit('SET_CARD', response.data.data)
      })
      .catch(error => {
        throw error
      })
  },
  process({ state }, { boxID, remember }) {
    return SessionService.process(boxID, state.card.id, remember)
      .then(
        //
      )
      .catch(error => {
        throw error
      })
  }
}
export const getters = {
  getCard: state => {
    return state.card
  },
}