<template>
    <nav class="navbar navbar-expand navbar-dark bg-primary">
        <router-link :to="{ name: 'home' }" class="navbar-brand">Task Manager</router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link
                    v-if="isAuthenticated"
                    tag="li"
                    class="nav-item"
                    activeClass="active"
                    :to="{ name: 'tasks' }"
                    >
                    <a class="nav-link">Tasks</a>
                </router-link>
            </ul>
            <ul class="navbar-nav">
                <router-link
                    v-if="!isAuthenticated"
                    tag="li"
                    class="nav-item"
                    activeClass="active"
                    :to="{ name: 'login' }"
                    >
                    <a class="nav-link">Login</a>
                </router-link>
                <router-link
                    v-if="!isAuthenticated"
                    tag="li"
                    class="nav-item"
                    activeClass="active"
                    :to="{ name: 'register' }"
                    >
                    <a class="nav-link">Register</a>
                </router-link>

                <b-dropdown
                    v-if="isAuthenticated"
                    right 
                    :text="userName" 
                    variant="primary"
                    >
                    <router-link
                        :to="{ name: 'profile' }"
                        v-slot="{ navigate, isActive }"
                        >
                        <b-dropdown-item :active="isActive" @click="navigate">Profile</b-dropdown-item>
                    </router-link>

                    <b-dropdown-item href="#" @click="logout">Logout</b-dropdown-item>
                    <b-dropdown-item href="#" @click="logoutAll">Logout All</b-dropdown-item>
                </b-dropdown>
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        userName() {
            return this.$store.getters.userName
        }
    },
    methods: {
        logout() {
            axios.post('/users/logout')
                .then(res => {
                    let data = res.data
                    this.$bvToast.toast(data.message, {
                        title: 'Success',
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-top-center'
                    })

                    let authData = {
                        token: null,
                        userName: null
                    }
                    this.$store.dispatch('setAuthData', authData)
                    this.$router.push({ name: 'login'})
                })
                .catch(error => {
                    let message = 'Something went wrong'
                    if (error.response && error.response.data && error.response.data.message) {
                        message = error.response.data.message
                    }

                    this.$bvToast.toast(message, {
                        title: 'Error',
                        variant: 'danger',
                        solid: true,
                        toaster: 'b-toaster-top-center'
                    })
                })
        },
        logoutAll() {
            axios.post('/users/logoutAll')
                .then(res => {
                    let data = res.data
                    this.$bvToast.toast(data.message, {
                        title: 'Success',
                        variant: 'success',
                        solid: true,
                        toaster: 'b-toaster-top-center'
                    })

                    let authData = {
                        token: null,
                        userName: null
                    }
                    this.$store.dispatch('setAuthData', authData)
                    this.$router.push({ name: 'login'})
                })
                .catch(error => {
                    let message = 'Something went wrong'
                    if (error.response && error.response.data && error.response.data.message) {
                        message = error.response.data.message
                    }

                    this.$bvToast.toast(message, {
                        title: 'Error',
                        variant: 'danger',
                        solid: true,
                        toaster: 'b-toaster-top-center'
                    })
                })
        }
    }
}
</script>