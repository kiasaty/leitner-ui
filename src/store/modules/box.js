import UserBoxService from '@/services/UserBoxService.js'

export const namespaced = true

export const state = {
  boxes: [],
  box: {},
  index: null,
  perPage: 3
}

export const mutations = {
  SET_INDEX(state, index) {
    state.index = index
  },
  UNSET_INDEX(state) {
    state.index = null
  },
  SET_BOXES(state, boxes) {
    state.boxes = boxes
  },
  ADD_BOX(state, box) {
    state.boxes.push(box)
  },
  SET_BOX(state, box) {
    state.box = box
  },
  EDIT_BOX(state, box) {
    state.boxes.splice(state.index, 1, box)
  },
  DELETE_BOX(state) {
    state.boxes.splice(state.index, 1)
  },
}

export const actions = {
  setIndex({ commit }, index) {
    commit('SET_INDEX', index)
  },
  unsetIndex({ commit }) {
    commit('UNSET_INDEX')
  },
  fetchBoxes({ commit, rootState }, args = {}) {
    return UserBoxService.fetchAll(rootState.user.user.id, args)
      .then(response => {
        commit('SET_BOXES', response.data.data)
      })
      .catch(error => {
        throw error
      })
  },
  createBox({ commit, rootState }, formData) {
    return UserBoxService.create(rootState.user.user.id, formData)
      .then(response => {
        let newBox = response.data.data
        commit('ADD_BOX', newBox)
        commit('SET_BOX', newBox)
      })
      .catch(error => {
        throw error
      })
  },
  fetchBox({ commit, getters, state, rootState }, boxID) {
    if (boxID == state.box.id) {
      return state.box
    }

    let box = getters.getBoxByID(boxID)
    if (box) {
      commit('SET_BOX', box)
      return box
    }
    
    return UserBoxService.fetch(rootState.user.user.id, boxID)
      .then(response => {
        commit('SET_BOX', response.data.data)
        return response.data.data
      })
  },
  updateBox({ commit, rootState }, formData) {
    return UserBoxService.update(rootState.user.user.id, formData)
      .then(response => {
        let updatedBox = response.data.data
        commit('EDIT_BOX', updatedBox)
        commit('SET_BOX', updatedBox)
      })
      .catch(error => {
        throw error
      })
  },
  deleteBox({ commit, rootState }) {
    return UserBoxService.delete(rootState.user.user.id, state.boxes[state.index].id)
      .then(
        commit('DELETE_BOX')
      )
      .catch(error => {
        throw error
      })
  },
}
export const getters = {
  getBoxes: state => {
    return state.boxes
  },
  getBox: state => {
    return state.box
  },
  getIndex: state => {
    return state.index
  },
  getBoxByID: state => id => {
    return state.boxes.find(box => box.id == id)
  }
}