<template>
    <b-card class="my-1">
        <b-card-text>
            <b-form-checkbox 
                size="lg" 
                class="d-inline-block"
                value="true"
                unchecked-value="false"
                v-model="isCompleted"
                ></b-form-checkbox>
            <span>{{ task.title }}</span>
            <span class="ml-1 text-muted">{{ task.description }}</span>
        </b-card-text>
    </b-card>
</template>

<script>
import axios from 'axios'

export default {
    props: ['task'],
    data: function() {
        return {
            isCompleted: this.task.completed
        }
    },
    watch: {
        isCompleted() {
            this.updateIsCompleted()
        }
    },
    methods: {
        updateIsCompleted() {
            axios.patch('/tasks/' + this.task._id, { completed: this.isCompleted })
                .catch(error => {
                    let message = 'Something went wrong'
                    if (error.response && error.response.data && error.response.data.message) {
                        message = error.response.data.message
                    }
                    this.displayToast('danger', message)
                })
        }
    }
}
</script>