<template>
    <div>
        <h1>Tasks page</h1>

        <button class="btn btn-primary" @click="taskFromRecord = {}">Add Task</button>

        <app-task-form
            v-if="taskFromRecord"
            :task="taskFromRecord"
            @modal-close="taskFromRecord = null"
        ></app-task-form>
    </div>
</template>

<script>

import TaskForm from '../components/tasks/TaskForm.vue';

export default {
    components: {
        'app-task-form': TaskForm,
    },
    data: function() {
        return {
            taskFromRecord: null
        }
    }
}
</script>