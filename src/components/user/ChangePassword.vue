<template>
    <div class="card">        
        <div class="card-body">
            <h1 class="text-center">Change Password</h1>
            <hr>
            <div v-if="error_message" class="alert alert-danger text-center" role="alert">
                {{ error_message }}
            </div>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="name">Current Password*</label>
                    <input
                        type="password"
                        v-model="current_password"
                        class="form-control"
                        :class="{ 'is-invalid' : formErrors.current_password }" 
                        >
                    <div class="invalid-feedback" v-if="formErrors.current_password">
                        {{ formErrors.current_password }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="name">New Password*</label>
                    <input
                        type="password"
                        v-model="new_password"
                        class="form-control"
                        :class="{ 'is-invalid' : formErrors.new_password }" 
                        >
                    <div class="invalid-feedback" v-if="formErrors.new_password">
                        {{ formErrors.new_password }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="name">Confirm Password*</label>
                    <input
                        type="password"
                        v-model="confirm_password"
                        class="form-control"
                        :class="{ 'is-invalid' : formErrors.confirm_password }" 
                        >
                    <div class="invalid-feedback" v-if="formErrors.confirm_password">
                        {{ formErrors.confirm_password }}
                    </div>
                </div>
                <button 
                    type="submit"
                    class="btn btn-primary"
                    :disabled="submitting"
                    >Submit <span v-if="submitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <div class="clear-fix"></div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
        return {
            current_password: '',
            new_password: '',
            confirm_password: '',
            formErrors: {},
            error_message: '',
            submitting: false,
        }
    },
    methods: {
        submit() {
            this.submitting = true
            let formData = {
                'current_password': this.current_password,
                'new_password': this.new_password,
                'confirm_password': this.confirm_password
            }
            axios.patch('/users/me/password', formData)
                .then(res => {
                    let data = res.data
                    this.displayToast('success', data.message)

                    this.current_password = ''
                    this.new_password = ''
                    this.confirm_password = ''
                    
                    this.formErrors = {}
                    this.error_message = ''
                    this.submitting = false
                })
                .catch(error => {
                   if (error.response && error.response.data && error.response.data.errors) {
                        let data = error.response.data
                        this.formErrors = data.errors
                        this.error_message = data.message
                    } else {
                        let message = 'Something went wrong'
                        if (error.response && error.response.data && error.response.data.message) {
                            message = error.response.data.message
                        }
                        this.error_message = message
                        this.formErrors = {}
                    }
                    this.submitting = false
                })
        }
    }
}
</script>