<template>
    <div class="row">
        <div class="col-12">
            <h1 class="float-left">Tasks</h1>
            <button
                class="btn btn-primary float-right my-2" 
                @click="taskFromRecord = {}"
                >
                Add Task
            </button>
        </div>
        <div class="clear-fix"></div>
        
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