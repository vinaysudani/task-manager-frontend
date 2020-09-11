<template>
    <div class="row">
        <div class="col-12 text-center my-1" v-if="loading">
            <b-spinner label="Loading..." small variant="secondary"></b-spinner>
        </div>
        <div class="col-12" v-for="task of tasks" :key="task.id">
            <app-task :task="task"></app-task>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Task from './Task.vue'

export default {
    components: {
        'app-task': Task
    },
    data: function() {
        return {
            tasks: [],
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