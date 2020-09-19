import Vue from 'vue'
import VueRouter from 'vue-router'
import multiguard from 'vue-router-multiguard'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Tasks from '../views/Tasks.vue'

import auth from '../middleware/auth'
import guest from '../middleware/guest'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: multiguard([guest]),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: multiguard([guest]),
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: multiguard([auth]),
        meta: {
            title: 'Profile'
        }
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        beforeEnter: multiguard([auth]),
        meta: {
            title: 'Tasks'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = 'Task Manager - ' + to.meta.title
    next()
})
export default router
