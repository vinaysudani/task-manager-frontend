<template>
    <b-modal ref="my-modal" :title="this.id ? 'Edit Task' : 'Add Task'" @hidden="$emit('modal-close')" no-fade>
        <div slot="modal-footer">
            <b-button
                variant="primary" 
                @click="$refs['dummy_submit'].click()" 
                :disabled="isSaving"
                class="mx-1"
                >
                Submit
                <b-spinner v-if="isSaving" small label="Spinning"></b-spinner>
            </b-button>
            <b-button 
                variant="secondary" 
                @click="hideModal"
                >
                Cancel
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="col-sm-12">
                    <div v-if="error_message" class="alert alert-danger text-center" role="alert">
                        {{ error_message }}
                    </div>
                    <div class="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid' :  formErrors.title }"
                            v-model="title">
                        <div v-if="formErrors.title" class="invalid-feedback">
                            <template v-for="error_message in formErrors.title" >{{ error_message }}</template>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea 
                            v-model="description"
                            rows="3"
                            class="form-control"
                            :class="{ 'is-invalid' :  formErrors.description }"
                            >
                        </textarea>
                        <div v-if="formErrors.description" class="invalid-feedback">
                            <template v-for="error_message in formErrors.description" >{{ error_message }}</template>
                        </div>
                    </div>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios'

export default {
    props: ['task'],
    data : function(){
        return {
            id: this.task.id,
            title: this.task.title,
            description: this.task.description,
            isSaving: false,
            formErrors: [],
            error_message: ''
        };
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
        saveRecord() {
            this.isSaving = true
            let data = {
                title: this.title,
                description: this.description,
            }
            axios.post('/tasks', data)
                .then(res => {
                    let data = res.data
                    this.displayToast('success', data.message)
                    this.hideModal()
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
                    this.isSaving = false
                })
        }
    }
}
</script>
