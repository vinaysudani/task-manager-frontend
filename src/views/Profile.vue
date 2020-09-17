<template>
    <div class="row mt-4">
        <div class="col-md-6 my-1">
            <app-profile></app-profile>
        </div>
        <div class="col-md-6 my-1">
            <app-change-password></app-change-password>
        </div>
    </div>
</template>

<script>
import Profile from '../components/user/Profile.vue'
import ChangePassword from '../components/user/ChangePassword.vue'

export default {
    components: {
        'app-profile': Profile,
        'app-change-password': ChangePassword
    }
}
</script>