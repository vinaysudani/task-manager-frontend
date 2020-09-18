import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'

import './assets/style.scss'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.mixin(mixin)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
