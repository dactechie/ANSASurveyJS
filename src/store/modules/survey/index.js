import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'
import getters from './getters'

export default {
    state: {
        survey: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    },
    getters,
    actions,
    mutations,
}