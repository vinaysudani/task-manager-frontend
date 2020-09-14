<template>
    <b-modal ref="my-modal" title="Task Details" @hidden="$emit('modal-close')" no-fade>
        <div slot="modal-footer">
            <b-button 
                variant="secondary" 
                @click="hideModal"
                >
                Close
            </b-button>
        </div>
        <div class="col-12 text-center" v-if="isLoading">
            <b-spinner small label="Spinning"></b-spinner>
        </div>
        <div class="col-12" v-if="!isLoading">
            <p><span class="text-muted">Title:</span> {{ task.title }}</p>
            <p><span class="text-muted">Description:</span> {{ task.description }}</p>
            <p><span class="text-muted">Status:</span> {{ task.complete ? 'Complete' : 'Incomplete' }}</p>
            <br>
            <p><span class="text-muted">Created At:</span> {{ localDateTime(task.createdAt) }}</p>
            <p><span class="text-muted">Updated At:</span> {{ localDateTime(task.updatedAt) }}</p>
        </div>
    </b-modal>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    props: ['task_id'],
    data : function(){
        return {
            id: this.task_id,
            isLoading: false,
            task: {}
        };
    },
    created() {
        this.fetchTask()
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
        fetchTask() {
            this.isLoading = true
            axios.get('/tasks/' + this.id)
                .then((res) => {
                    this.task = res.data.task
                    this.isLoading = false
                })
                .catch(error => {
                    let message = 'Something went wrong'
                    if (error.response && error.response.data && error.response.data.message) {
                        message = error.response.data.message
                    }
                    this.displayToast('danger', message)
                })
        },
        localDateTime(dateTime) {
            return moment(dateTime).format('DD-MM-YYYY HH:mm A')
        }
    }
}
</script>