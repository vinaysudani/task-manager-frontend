<template>
    <div class="card-body">
        <h1 class="text-center">Profile</h1>
        <hr>
        <div v-if="error_message" class="alert alert-danger text-center" role="alert">
            {{ error_message }}
        </div>
        <div class="text-center" v-if="loading">
            <b-spinner
                label="Loading..." 
                small 
                variant="secondary"
            ></b-spinner>
        </div>
        <form @submit.prevent="saveProfile" v-if="!loading">
            <div class="form-group">
                <label for="name">Name*</label>
                <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid' : formErrors.name }" 
                    id="name"
                    v-model="user.name"
                    >
                <div class="invalid-feedback" v-if="formErrors.name">
                    {{ formErrors.name }}
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email*</label>
                <input 
                    type="text"
                    class="form-control" 
                    :class="{ 'is-invalid' : formErrors.email }" 
                    id="email"
                    v-model="user.email">
                <div class="invalid-feedback" v-if="formErrors.email">
                    {{ formErrors.email }}
                </div>
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input 
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid' : formErrors.age }" 
                    id="age"
                    v-model="user.age"
                    >
                <div class="invalid-feedback" v-if="formErrors.age">
                    {{ formErrors.age }}
                </div>
            </div>
            <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="submitting"
                >Update <span v-if="submitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
            <div class="clear-fix"></div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function() {
        return {
            user: {},
            formErrors: {},
            error_message: '',
            submitting: false,
            loading: false
        }
    },
    created() {
        this.fetchProfile()
    },
    methods: {
        fetchProfile() {
            this.loading = true
            axios.get('/users/me')
                .then(res => {
                    let data = res.data
                    this.user = data.user
                    this.loading = false
                })
                .catch(error => {
                    let message = 'Something went wrong'
                    if (error.response && error.response.data && error.response.data.message) {
                        message = error.response.data.message
                    }
                    this.displayToast('danger', message)
                })
        },
        saveProfile() {
            this.submitting = true
            let profileData = {
                'name': this.user.name,
                'email': this.user.email,
                'age': this.user.age
            }
            axios.patch('/users/me', profileData)
                .then(res => {
                    let data = res.data
                    this.user = data.user
                    this.$store.dispatch('setUserName', data.user.name)
                    this.displayToast('success', data.message)

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