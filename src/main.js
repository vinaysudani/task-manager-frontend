import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style.scss'

axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
