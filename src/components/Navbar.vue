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

                    <b-dropdown-item href="#">Logout</b-dropdown-item>
                    <b-dropdown-item href="#">Logout All</b-dropdown-item>
                </b-dropdown>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        userName() {
            return this.$store.getters.userName
        }
    }
}
</script>