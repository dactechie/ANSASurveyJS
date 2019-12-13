import { STORAGE_KEY } from './mutations'
//import createLogger from '../../../src/plugins/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { messages }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  })
}
export default [localStoragePlugin]
//export default process.env.NODE_ENV !== 'production'
//  ? [createLogger(), localStoragePlugin]
//  : [localStoragePlugin]