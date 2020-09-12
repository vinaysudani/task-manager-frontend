<template>
    <div class="row">
        <div class="col-12">
            <h1 class="float-left">Tasks</h1>
            <button
                class="btn btn-primary float-right my-2" 
                @click="add_task = true"
                >
                Add Task
            </button>
        </div>
        <div class="clear-fix"></div>

        <app-task-form
            v-if="add_task"
            :task="{}"
            @modal-close="add_task = false"
            @task-created="fetchTasks"
        ></app-task-form>

        <div class="col-12 text-center my-1" v-if="loading">
            <b-spinner label="Loading..." small variant="secondary"></b-spinner>
        </div>
        <div class="col-12" v-for="task of tasks" :key="task.id">
            <app-task 
                :task="task" 
                @task-updated="fetchTasks"
                @task-deleted="fetchTasks"
            ></app-task>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Task from './Task.vue'
import TaskForm from './TaskForm.vue'

export default {
    components: {
        'app-task': Task,
        'app-task-form': TaskForm
    },
    data: function() {
        return {
            tasks: [],
            add_task: false,
            loading: false
        }
    },
    created() {
        this.fetchTasks()
    },
    methods: {
        fetchTasks() {
            this.loading = true
            axios.get('/tasks')
                .then(res => {
                    this.tasks = res.data
                    this.loading = false
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