import SessionService from '@/services/SessionService.js'

export const namespaced = true

export const state = {
  card: {},
  previousCard: {},
}

export const mutations = {
  SET_CARD(state, card) {
    state.previousCard = state.card
    state.card = card
  },
  RESET_PREVIOUS_CARD(state) {
    state.card = state.previousCard
    state.previousCard = {}
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
  review({ state, commit }, { boxID, remember }) {
    return SessionService.review(boxID, state.card.id, remember)
      .then(response => {
        if (response.data) {
          commit('SET_CARD', response.data.data)
        }
      })
      .catch(error => {
        throw error
      })
  },
  previous({ commit }) {
    commit('RESET_PREVIOUS_CARD')
  }
}
export const getters = {
  getCard: state => {
    return state.card
  },
  isPreviousCardReviewable: state => {
    return Object.keys(state.previousCard).length !== 0;
  },
}