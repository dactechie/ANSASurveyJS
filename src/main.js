// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
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

Vue.use(VueHammer);
Vue.use(SuiVue);
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
