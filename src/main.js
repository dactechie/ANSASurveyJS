// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
//import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios';
import {API_URL} from './constants'

Vue.config.productionTip = false



const baseAxios = axios.create({ baseURL: API_URL });
Vue.use(VueAxios, baseAxios)

new Vue({
 // router,
  store,
  render: h => h(App)
}).$mount('#app')

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
