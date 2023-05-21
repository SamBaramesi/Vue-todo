<template>
    <label>
        <input type="checkbox" v-model="localTodoItem.done" />
        <span :class="`bubble ${localTodoItem.category == 'business'
            ? 'business'
            : 'personal'
            }`"></span>
    </label>
    <div class="todo-content">
        <input type="text" v-model="localTodoItem.content" />
    </div>

    <div class="actions">
        <button class="delete" @click="passTodo(localTodoItem)">Delete</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "TodoItem",
    props: ["todoItem"],
    data() {
        return {
            localTodoItem: this.todoItem,
        };
    },
    watch: {
        localTodoItem: {
            deep: true,
            handler(newValue) {
                this.updateDatabase(newValue);
            },
        },
    },
    methods: {
        updateDatabase(updatedTodo) {

            axios.put(`http://localhost:8000/update-todo/${updatedTodo._id}`, {
                content: updatedTodo.content,
                done: updatedTodo.done
            })
                .then(response => {
                    console.log('Todo updated successfully:', response.data);
                })
                .catch(error => {
                    console.error('Failed to update todo:', error.response.data.error);
                });
        },
        passTodo() {
            this.$emit("passTodo", this.localTodoItem);
        },
    },
    emits: ["passTodo"],
};
</script>