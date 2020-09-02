<template>
    <div class="row mt-4">
        <div class="card m-auto p-1 m-1" style="width:450px">
            <div class="card-body">
                <h1 class="text-center">Login</h1>
                <hr>
                <div v-if="error_message" class="alert alert-danger text-center" role="alert">
                    {{ error_message }}
                </div>
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="email">Email*</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            :class="{ 'is-invalid' : formErrors.email }" 
                            id="email"
                            v-model="email">
                        <div class="invalid-feedback" v-if="formErrors.email">
                            {{ formErrors.email }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password*</label>
                        <input 
                            type="password" 
                            class="form-control"
                            :class="{ 'is-invalid' : formErrors.password }" 
                            id="password"
                            v-model="password"
                            >
                        <div class="invalid-feedback" v-if="formErrors.password">
                            {{ formErrors.password }}
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        class="btn btn-primary"
                        :disabled="submitting"
                        >Submit <span v-if="submitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
        return {
            email: '',
            password: '',
            formErrors: {},
            error_message: '',
            submitting: false,
        }
    },
    methods: {
        register() {
            this.submitting = true
            let loginData = {
                email: this.email,
                password: this.password
            }

            axios.post('/users/login', loginData)
                .then(res => {
                    let data = res.data
                    
                    let authData = {
                        token: data.token,
                        userName: data.user.name
                    }
                    this.$store.dispatch('setAuthData', authData)
                    
                    this.$router.push({ name: 'home'})

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