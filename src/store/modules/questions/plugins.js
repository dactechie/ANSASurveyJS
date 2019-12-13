import { STORAGE_KEY } from './mutations'
//import createLogger from '../../../src/plugins/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { questions }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(questions))
  })
}
export default [localStoragePlugin]
//export default process.env.NODE_ENV !== 'production'
//  ? [createLogger(), localStoragePlugin]
//  : [localStoragePlugin]