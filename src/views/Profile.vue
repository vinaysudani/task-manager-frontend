<template>
    <div class="row mt-4">
        <div class="col-md-6 my-1">
            <app-profile></app-profile>
        </div>
        <div class="col-md-6 my-1">
            <app-change-password></app-change-password>
        </div>
        <div class="col-md-12 my-1">
            <app-delete-account></app-delete-account>
        </div>
    </div>
</template>

<script>
import Profile from '../components/user/Profile.vue'
import ChangePassword from '../components/user/ChangePassword.vue'
import DeleteAccount from '../components/user/DeleteAccount.vue'

export default {
    components: {
        'app-profile': Profile,
        'app-change-password': ChangePassword,
        'app-delete-account': DeleteAccount
    }
}
</script>