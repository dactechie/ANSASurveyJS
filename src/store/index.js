import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
// https://github.com/robinvdvleuten/vuex-persistedstate
//import client from './modules/client/'
import survey from './modules/survey/'

Vue.use(Vuex)


//console.log("Going")
export default new Vuex.Store({
    modules:{
      survey,
      //client
    },
    // reducer: state => ({
    //   survey: survey.survey,
    // }),
    plugins: [
      createPersistedState({
        key : 'mj-surveyjs',
        paths: ['survey'],
      })
    ]

})


/**
 *  Encrypted local storage
 * import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

// https://github.com/softvar/secure-ls

const store = new Store({
  // ...
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
});
 * 
 */