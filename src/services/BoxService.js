import axios from 'axios'

export default {

  fetchAll(args) {
    let url = 'boxes'

    if (args.searchQuery) {
      url += `?q=${args.searchQuery}`
    }

    return axios.get(url)
  },

  fetch(boxID) {
    let url = `boxes/${boxID}`

    return axios.get(url)
  },

  create(formData) {
    return axios.post('/boxes', formData)
  },

  update(formData, boxID = null) {
    formData.append("_method", "PUT")
    boxID = boxID || formData.get('id')
    return axios.post("boxes/" + boxID, formData)
  },

  delete(boxID) {
    return axios.delete("boxes/" + boxID)
  },

}