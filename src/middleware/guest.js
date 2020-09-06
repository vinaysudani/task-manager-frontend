import store from '../store'

export default function guest(to, from, next) {
    if (store.getters.isAuthenticated) {
        next({ name: 'tasks' })
    }
    else {
        next()
    }
}