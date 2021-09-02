const one = () => import(/* webpackChunkName: "login" */ '../pages/test/one.vue')

const config = [
    {
        path: '/one',
        name: 'one',
        component: one,
        meta: {
            title: '测试',
        },
    },
]

export default config
