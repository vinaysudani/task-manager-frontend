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

export default {
    components: {
        appNavbar: Navbar
    }
}
</script>