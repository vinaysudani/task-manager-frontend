import store from '../store'

export default function auth(to, from, next) {
    if (!store.getters.isAuthenticated) {
        next({ name: 'login' , query: { redirect: to.fullPath }})
    }
    else {
        next()
    }
}