import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import axios from 'axios'

Vue.config.productionTip = false

const base = axios.create({
  baseURL: 'https://api.covid19api.com/'
})

Vue.prototype.$http = base

Vue.use(VueRouter)

UIkit.use(Icons)

Object.defineProperty(Vue.prototype, '$uikit', {
  value: UIkit,
  writable: false
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
