<template>
    <b-card class="my-1">
        <b-card-text>
            <div class="float-left">
                <b-form-checkbox
                    size="lg"
                    class="d-inline-block"
                    value="true"
                    unchecked-value="false"
                    v-model="isCompleted"
                    ></b-form-checkbox>
                <span>{{ task.title }}</span>
                <span class="ml-1 text-muted">{{ task.description }}</span>
            </div>
            <div class="float-right">
                <b-button variant="outline-primary" class="mx-1" @click="display_details = true">Details</b-button>
                <b-button variant="outline-primary" class="mx-1" @click="edit_task = true">Edit</b-button>
                <b-button variant="outline-danger" @click="delete_task = true">Delete</b-button>
            </div>
            <div class="clearfix"></div>
            <p class="text-muted mb-0">{{ lastActivityTime }}</p>
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

        <app-task-details
            v-if="display_details"
            :task_id="task._id"
            @modal-close="display_details = false"
            >
        </app-task-details>
    </b-card>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

import TaskForm from './TaskForm.vue'
import DeleteTask from './DeleteTask.vue'
import TaskDetails from './TaskDetails.vue'

export default {
    props: ['task'],
    components: {
        'app-task-form': TaskForm,
        'app-delete-task': DeleteTask,
        'app-task-details': TaskDetails
    },
    data: function() {
        return {
            edit_task: false,
            delete_task: false,
            display_details: false,
            isCompleted: this.task.completed
        }
    },
    watch: {
        isCompleted() {
            this.updateIsCompleted()
        }
    },
    computed: {
        lastActivityTime() {
            let label = this.task.createdAt == this.task.updatedAt ? 'Created' : 'Updated'
            label = label + ' ' + moment(this.task.updatedAt).fromNow()
            return label
        }
    },
    methods: {
        updateIsCompleted() {
            axios.patch('/tasks/' + this.task._id, { completed: this.isCompleted })
                .then(() => {
                    this.$emit('task-updated')
                })
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