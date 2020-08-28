import Vue from 'vue'
import axios from 'axios'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false

Vue.use(Toast, {
    timeout: 5000,
    hideProgressBar: true,
    newestOnTop: false
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
