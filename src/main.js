// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios';
import { VueHammer } from 'vue2-hammer'

//import App from './AppCreator.vue' 
//import router from './router'
import App from './App.vue'
import store from './store/index'
//import _ from 'lodash';
// import {API_URL} from './constants'

// global component resistration 
//import BaseIcon from '@/components/BaseIcon.vue'
//Vue.component('BaseIcon', BaseIcon);
// auto rego : https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components

Vue.config.productionTip = false;
//Object.defineProperty(Vue.prototype, '$_', { value: _ });
// const baseAxios = axios.create({ baseURL: API_URL });

// Vue.use(VueAxios, baseAxios);

// WARNING .. this may not work .. what if the token is destroyed from local storage
// Vue.axios.defaults.headers.common['Authorization'] =
//                                          'Bearer ' + localStorage.getItem('token');


Vue.use(VueHammer);

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
