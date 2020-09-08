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