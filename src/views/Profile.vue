<template>
    <div class="row mt-4">
        <div class="card m-auto p-1 m-1" style="width:450px">
            <app-profile></app-profile>
        </div>
    </div>
</template>

<script>
import Profile from '../components/user/Profile.vue'

export default {
    components: {
        'app-profile': Profile
    }
}
</script>