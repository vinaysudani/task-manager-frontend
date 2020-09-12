<template>
     <b-modal ref="my-modal" title="Delete Task" @hidden="$emit('modal-close')" no-fade>
        <div slot="modal-footer">
            <b-button
                variant="danger" 
                @click="deleteTask" 
                :disabled="deleting"
                class="mx-1"
                >
                Delete
                <b-spinner v-if="deleting" small label="Spinning"></b-spinner>
            </b-button>
            <b-button 
                variant="secondary" 
                @click="hideModal"
                >
                Don't Delete
            </b-button>
        </div>
        <p>Are you sure you want to delete this task?</p>
        <p>Task: {{ task.title }}</p>
    </b-modal>
</template>

<script>
import axios from 'axios'

export default {
    props: ['task'],
    data: function() {
       return {
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
        deleteTask() {
            this.deleting = true
            axios.delete('/tasks/' + this.task._id)
                .then(res => {
                    let data = res.data
                    this.displayToast('success', data.message)
                    this.$emit('task-deleted')
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