import axios from 'axios'

export default {

  fetchAll(params = {}) {
    let url = 'users'

    return axios.get(url, { params })
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