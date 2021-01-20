import axios from 'axios'

export default {

  start(boxID) {
    return axios.post(`boxes/${boxID}/session/start`)
  },

  next(boxID) {
    return axios.get(`boxes/${boxID}/session/cards/next`)
  },
  
  review(boxID, cardID, remember) {
    return axios.post(`boxes/${boxID}/session/cards/${cardID}/review`, { remember: remember })
  },

}