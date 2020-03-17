import axios from 'axios'

export default {

  fetchAll(args) {
    let url = 'users'

    if (args.searchQuery) {
      url += `?q=${args.searchQuery}`
    }

    return axios.get(url)
  },

  fetch(userID) {
    let url = `users/${userID}`

    return axios.get(url)
  },

  create(formData) {
    return axios.post('/users', formData)
  },

  update(formData, userID = null) {
    formData.append("_method", "PUT")
    userID = userID || formData.get('id')
    return axios.post("users/" + userID, formData)
  },

  delete(userID) {
    return axios.delete("users/" + userID)
  },

  login(formData) {
    return axios.post('/login', formData)
  },

}