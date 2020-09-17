<template>
     <b-modal ref="my-modal" title="Delete Account" @hidden="$emit('modal-close')" no-fade>
        <div slot="modal-footer">
            <b-button
                variant="danger" 
                @click="deleteAccount"
                :disabled="deleting || !confirm"
                class="mx-1"
                >
                Delete account
                <b-spinner v-if="deleting" small label="Spinning"></b-spinner>
            </b-button>
            <b-button 
                variant="secondary" 
                @click="hideModal"
                >
                Don't Delete
            </b-button>
        </div>
        <label>
            <input 
                type="checkbox"
                v-model="confirm"
                > I understand the result of this action, i want to delete my account permanently.
        </label>
    </b-modal>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
       return {
            confirm: false,
            deleting: false,
       }
    },
    mounted(){
        this.showModal();
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        deleteAccount() {
            this.deleting = true
            axios.delete('/users/me')
                .then(res => {
                    let data = res.data
                    this.displayToast('success', data.message)
                    this.$emit('account-deleted')
                    this.hideModal()
                    this.deleting = false
                })
                .catch(error => {
                    let message = 'Something went wrong'
                    if (error.response && error.response.data && error.response.data.message) {
                        message = error.response.data.message
                    }
                    this.displayToast('danger', message)
                    this.deleting = false
                })
        }
    }
}
</script>