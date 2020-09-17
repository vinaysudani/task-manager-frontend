<template>
    <div class="card border-danger">        
        <div class="card-body">
            <h1 class="text-center">Delete Account</h1>
            <hr>
            <p>Once you delete your account, all data associated with this account will be permanently lost and there is no going back.</p>
            <b-button
                variant="danger"
                @click="delete_account = true"
                >
                Delete account
            </b-button>
        </div>

        <app-delete-confirm
            v-if="delete_account"
            @modal-close="delete_account = false"
            @account-deleted="accountDeleted"
        ></app-delete-confirm>
    </div>
</template>

<script>
import DeleteAccountConfirm from './DeleteAccountConfirm.vue'

export default {
    components: {
        'app-delete-confirm': DeleteAccountConfirm
    },
    data: function() {
        return {
            delete_account: false
        }
    },
    methods: {
        accountDeleted() {
            let authData = {
                token: null,
                userName: null
            }
            this.$store.dispatch('setAuthData', authData)
            this.$router.push({ name: 'login'})
        }
    }
}
</script>