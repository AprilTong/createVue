import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 一级路由
import One from './one';
import Promote from './promote'
import report from './report'

const router = new VueRouter({
  routes: [
    ...One,
    ...Promote,
    ...report
  ]
})

//设置标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
