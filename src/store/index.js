import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

//import client from './modules/client/'
import survey from './modules/survey/'

Vue.use(Vuex)

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
        paths: ['survey'],
      })
    ]

})