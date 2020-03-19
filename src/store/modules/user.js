import UserService from '@/services/UserService.js'
import axios from 'axios'

export const namespaced = true

export const state = {
  user: null
}

export const mutations = {
  SET_USER_DATA(state, data) {
    state.user = data.data
    localStorage.setItem('user', JSON.stringify(data))
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem('user')
    location.reload()
  }
}

export const actions = {
  register({ dispatch }, data) {
    return UserService.create(data)
      .then( () => {
        dispatch('login', data)
      })
      .catch(error => {
        throw error
      })
  },
  login({ commit }, credentials) {
    return UserService.login(credentials)
      .then( response => {
        commit('SET_USER_DATA', response.data)
        return response
      })
      .catch(error => {
        throw error
      })
  },
  logout({ commit }) {
      commit('CLEAR_USER_DATA')
  }
}

export const getters = {
  isLoggedIn(state) {
    return !!state.user
  },
  isAdmin(state) {
    return (state.user) && (state.user.role == 'admin')
  },
  getUser(state) {
    if(state.user) return state.user
  },
  getUserInitials() {
    let firstnameFirstcharacter = state.user.firstname.toUpperCase().charAt(0)
    let lastnameFirstcharacter  = state.user.lastname.toUpperCase().charAt(0)
    return firstnameFirstcharacter + ' ' + lastnameFirstcharacter
  },
}