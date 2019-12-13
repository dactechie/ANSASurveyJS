import questions from './modules/questions/'
import answers from './modules/answers/'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
      questions,
      answers,
    }
})