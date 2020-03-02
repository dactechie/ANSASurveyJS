import { mutations } from './mutations'//STORAGE_KEY
import actions from './actions'
import getters from './getters'

export default {
    state: {
       // survey: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    },
    getters,
    actions,
    mutations,
}