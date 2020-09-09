<template>
    <div>
        <app-navbar></app-navbar>
        <div class="container-fluid">
            <router-view />
        </div>
    </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
import axios from 'axios'

export default {
    components: {
        appNavbar: Navbar
    },
    computed: {
        authToken() {
            return this.$store.getters.authToken
        }
    },
    watch: {
        authToken() {
            this.refreshAxiosToken()
        }
    },
    created() {
        this.refreshAxiosToken(this.authToken)
        axios.interceptors.response.use(undefined, (error) => {
            if (error.response && error.response.status === 401) {
                this.$store.dispatch('setAuthData',  { token: null, userName: null })
                this.$router.push({ name: 'login' , query: { redirect: this.$route.fullPath }})
            }
            return Promise.reject(error)
        })
    },
    methods: {
        refreshAxiosToken() {
            if (this.authToken) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        }
    }
}
</script>