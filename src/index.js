import './resources/css/reset.css'
import './resources/css/page.less'

import Vue from 'vue'
import App from './App.vue'

// ElementUI引入
import ElementUI from 'element-ui'
import router from '../src/router/index'

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
