const report = () =>
  import(/* webpackChunkName: "login" */ '../pages/report/index.vue')

const config = [
  {
    path: '/report',
    name: 'login',
    component: report,
    meta: {
      title: '报表'
    }
  }
]

export default config
