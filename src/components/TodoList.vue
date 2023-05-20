<template>
    <section class="todo-list">
        <div class="list" id="todo-list">
            <div v-for="todoItem in todos_asc" :key="todoItem._id" :class="`todo-item ${todoItem.done && 'done'}`">
                <TodoItem @passTodo="getPassedTodo" :todoItem="todoItem"  />
            </div>
        </div>
    </section>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
    name: 'TodoList',
    data() {
        return {

        }
    },
    components: {
        TodoItem,
    },
    props: {
        todos_asc: {
            type: Array,
        }
    },
    methods: {
        getPassedTodo(localTodoItem) {
            this.$emit('getPassedTodo', localTodoItem)
        }
    }
}
</script>