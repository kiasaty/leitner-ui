import axios from 'axios'

export default {

  fetchAll(boxID, searchQuery) {
    let url = `boxes/${boxID}/cards`

    if (searchQuery) {
      url += `?q=${searchQuery}`
    }

    return axios.get(url)
  },

  fetch(boxID, cardID) {
    let url = `boxes/${boxID}/cards/${cardID}`

    return axios.get(url)
  },

  create(formData, boxID) {
    return axios.post(`boxes/${boxID}/cards`, formData)
  },

  update(formData, boxID, cardID) {
    formData.append("_method", "PUT")
    return axios.post(`boxes/${boxID}/cards/${cardID}`, formData)
  },

  delete(boxID, cardID) {
    return axios.delete(`boxes/${boxID}/cards/${cardID}`)
  },

}