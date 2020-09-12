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

            <div class="float-right">
                <b-button variant="outline-primary" class="mx-1" @click="edit_task = true">Edit</b-button>
                <b-button variant="outline-danger" @click="delete_task = true">Delete</b-button>
            </div>
        </b-card-text>

        <app-task-form
            v-if="edit_task"
            :task="task"
            @modal-close="edit_task = false"
            @task-updated="$emit('task-updated')"
        ></app-task-form>

        <app-delete-task
            v-if="delete_task"
            :task="task"
            @modal-close="delete_task = false"
            @task-deleted="$emit('task-deleted')"
        ></app-delete-task>
    </b-card>
</template>

<script>
import axios from 'axios'
import TaskForm from './TaskForm.vue'
import DeleteTask from './DeleteTask.vue'

export default {
    props: ['task'],
    components: {
        'app-task-form': TaskForm,
        'app-delete-task': DeleteTask
    },
    data: function() {
        return {
            edit_task: false,
            delete_task: false,
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