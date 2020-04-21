import BoxCardService from '@/services/BoxCardService.js'

export const namespaced = true

export const state = {
  cards: [],
  card: {},
  index: null,
  pageCount: null,
  currentPage: null
}

export const mutations = {
  SET_INDEX(state, index) {
    state.index = index
  },
  UNSET_INDEX(state) {
    state.index = null
  },
  SET_CARDS(state, cards) {
    state.cards = cards
  },
  ADD_CARD(state, card) {
    state.cards.push(card)
  },
  SET_CARD(state, card) {
    state.card = card
  },
  EDIT_CARD(state, card) {
    state.cards.splice(state.index, 1, card)
  },
  DELETE_CARD(state) {
    state.cards.splice(state.index, 1)
  },
  SET_PAGE_COUNT(state, pageCount) {
    state.pageCount = pageCount
  },
  SET_CURRENT_PAGE(state, currentPage) {
    state.currentPage = currentPage
  },
}

export const actions = {
  setIndex({ commit }, index) {
    commit('SET_INDEX', index)
  },
  unsetIndex({ commit }) {
    commit('UNSET_INDEX')
  },
  fetchCards({ commit, rootState }, { boxID, params }) {

    params.perPage = params.perPage || rootState.perPage

    return BoxCardService.fetchAll(boxID, params)
      .then(response => {
        commit('SET_CARDS', response.data.data)
        commit('SET_PAGE_COUNT', response.data.meta.last_page)
        commit('SET_CURRENT_PAGE', response.data.meta.current_page)
      })
      .catch(error => {
        throw error
      })
  },
  createCard({ commit }, { formData, boxID }) {
    return BoxCardService.create(formData, boxID)
      .then(response => {
        let newCard = response.data.data
        commit('ADD_CARD', newCard)
        commit('SET_CARD', newCard)
      })
      .catch(error => {
        throw error
      })
  },
  fetchCard({ commit, getters, state, rootState }, cardID) {
    if (cardID == state.card.id) {
      return state.card
    }

    let card = getters.getCardByID(cardID)
    if (card) {
      commit('SET_CARD', card)
      return card
    }
    
    return BoxCardService.fetch(rootState.box.box.id, cardID)
      .then(response => {
        commit('SET_CARD', response.data.data)
        return response.data.data
      })
  },
  updateCard({ commit }, { formData, boxID, cardID = formData.get('id') }) {
    return BoxCardService.update(formData, boxID, cardID)
      .then(response => {
        let updatedCard = response.data.data
        commit('EDIT_CARD', updatedCard)
        commit('SET_CARD', updatedCard)
      })
      .catch(error => {
        throw error
      })
  },
  deleteCard({ commit, rootState }, { boxID = rootState.box.box.id, cardID = state.cards[state.index].id}) {
    return BoxCardService.delete(boxID, cardID)
      .then(
        commit('DELETE_CARD')
      )
      .catch(error => {
        throw error
      })
  },
}
export const getters = {
  getCards: state => {
    return state.cards
  },
  getCard: state => {
    return state.card
  },
  getIndex: state => {
    return state.index
  },
  getPageCount: state => {
    return state.pageCount
  },
  getCurrentPage: state => {
    return state.currentPage
  },
  getCardByID: state => id => {
    return state.cards.find(card => card.id == id)
  }
}