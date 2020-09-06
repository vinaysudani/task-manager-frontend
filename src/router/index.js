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
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: multiguard([guest]),
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: multiguard([guest]),
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
        beforeEnter: multiguard([auth]),
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        meta: { requiresAuth: true },
        beforeEnter: multiguard([auth]),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
