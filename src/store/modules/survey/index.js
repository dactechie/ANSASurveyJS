import { mutations } from './mutations'//STORAGE_KEY
import actions from './actions'
import getters from './getters'

export default {
    state: {
      //'survey': {}
      survey: {}
      //survey : Vuex
        //survey: JSON.parse(window.localStorage.getItem('mj-surveyjs')) || '[]')
    },
    getters,
    actions,
    mutations,
}