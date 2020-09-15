<template>
    <div class="row">
        <div class="col-12">
            <h1 class="float-left">Tasks</h1>
            <div class="float-left ml-2 mt-3" v-if="loading">
                <b-spinner
                    label="Loading..." 
                    small 
                    variant="secondary"
                ></b-spinner>
            </div>
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
                        v-model="completed"
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
                        v-model="sortBy" 
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

        <div class="col-12 text-center" v-if="!loading && tasks.length == 0">
            <p>No tasks founds</p>
        </div>
        <div class="col-12" v-if="tasks.length > 0">
            <p>Total records: {{ total_records }}</p>
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

        <div class="col-12 my-2">
            <div class="form-group float-left">
                <label>Per page:</label>
                <b-form-select 
                    v-model="per_page" 
                    :options="[
                        { value: 5, text: '5' },
                        { value: 10, text: '10' },
                        { value: 50, text: '50' },
                        { value: 100, text: '100' },
                    ]"
                ></b-form-select>
            </div>
            <div class="form-group float-right">
                <label></label>
                <b-pagination
                    @change="pageChanged"
                    v-model="current_page"
                    :total-rows="total_records"
                    :per-page="per_page"
                    first-text="First"
                    prev-text="Prev"
                    next-text="Next"
                    last-text="Last"
                    >
                </b-pagination>
            </div>
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
            completed: null,
            sortBy: 'createdAt:asc',
            per_page: 5,
            total_records: 0,
            current_page: 1
        }
    },
    watch: {
        per_page() {
            this.current_page = 1
            this.fetchTasks()
        },
        completed() {
            this.current_page = 1
            this.fetchTasks()
        },
        sortBy() {
            this.current_page = 1
            this.fetchTasks()
        }
    },
    created() {
        this.fetchTasks()
    },
    methods: {
        pageChanged(page) {
            if (this.current_page == page){
                return
            }
            this.current_page = page
            this.fetchTasks()
        },
        fetchTasks() {
            this.loading = true
            let data = {
                completed: this.completed,
                sortBy: this.sortBy,
                per_page: this.per_page,
                current_page: this.current_page
            }
            axios.get('/tasks', {
                    params: data
                })
                .then(res => {
                    this.tasks = res.data.tasks
                    this.total_records = res.data.pagination.total_records
                    this.current_page = res.data.pagination.current_page
                    this.loading = false

                    if(this.current_page > 1 && this.tasks.length == 0) {
                        this.current_page = 1
                        this.fetchTasks()
                    }
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