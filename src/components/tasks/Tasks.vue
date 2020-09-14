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

        <div class="col-12">
            <div class="float-left">
                <label>Task status:</label>
                <b-form-group>
                    <b-form-radio-group
                        v-model="filter.completed"
                        :options=" [
                            { text: 'All', value: null },
                            { text: 'Incomplete', value: false },
                            { text: 'Complete', value: true }
                        ]"
                        buttons
                        button-variant="outline-primary"
                    ></b-form-radio-group>
                </b-form-group>
            </div>
            <div class="float-right">
                <label>Sort by:</label>
                 <b-form-group>
                    <b-form-select 
                        v-model="filter.sortBy" 
                        :options="[
                            { value: 'createdAt:asc', text: 'Created At (Oldest first)' },
                            { value: 'createdAt:desc', text: 'Created At (Newest first)' },
                            { value: 'updatedAt:asc', text: 'Updated At (Oldest first)' },
                            { value: 'updatedAt:desc', text: 'Updated At (Newest first)' },
                        ]"
                    ></b-form-select>
                </b-form-group>
            </div>
        </div>

        <div class="col-12 text-center my-1" v-if="loading">
            <b-spinner label="Loading..." small variant="secondary"></b-spinner>
        </div>
        <div class="col-12 text-center" v-if="!loading && tasks.length == 0">
            <p>No tasks founds</p>
        </div>

        <div class="col-12">
            Displaying: {{ tasks.length }}
        </div>
        <div class="col-12" 
            v-for="task of tasks" 
            :key="task._id">
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
            loading: false,
            filter: {
                completed: null,
                sortBy: 'createdAt:asc'
            }
        }
    },
    watch: {
        filter: {
            handler(){
                this.fetchTasks()
            },
            deep: true
        }
    },
    created() {
        this.fetchTasks()
    },
    methods: {
        fetchTasks() {
            this.loading = true
            let data = {
                ...this.filter
            }
            axios.get('/tasks', {
                    params: data
                })
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