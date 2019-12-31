const promote = () =>
  import(/* webpackChunkName: "login" */ '../pages/promote/index.vue')

const config = [
  {
    path: '/promote',
    name: 'login',
    component: promote,
    meta: {
      title: '推广'
    }
  }
]

export default config
