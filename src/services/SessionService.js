import axios from 'axios'

export default {

  start(boxID) {
    return axios.get(`session/start?box_id=${boxID}`)
  },

  next(boxID) {
    return axios.get(`session/next?box_id=${boxID}`)
  },
  
  process(boxID, cardID, remember) {
    return axios.get(`session/process?box_id=${boxID}&card_id=${cardID}&remember=${remember}`)
  },

}