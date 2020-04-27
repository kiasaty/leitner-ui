import axios from 'axios'

export default {

  fetchAll(userID, params = {}) {
    let url = `users/${userID}/boxes`

    return axios.get(url, { params })
  },

  fetch(userID, boxID) {
    let url = `users/${userID}/boxes/${boxID}`

    return axios.get(url)
  },

  create(userID, formData) {
    return axios.post(`users/${userID}/boxes`, formData)
  },

  update(userID, formData, boxID = null) {
    formData.append("_method", "PUT")
    boxID = boxID || formData.get('id')
    return axios.post(`users/${userID}/boxes/${boxID}`, formData)
  },

  delete(userID, boxID) {
    return axios.delete(`users/${userID}/boxes/${boxID}`)
  },

}