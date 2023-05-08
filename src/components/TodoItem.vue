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

export default {
    name: "TodoItem",
    props: ["todoItem"],
    data() {
        return {
            localTodoItem: this.todoItem
        }
    },
    methods: {
        passTodo(localTodoItem) {
            this.$emit('passTodo', localTodoItem)
        }
    },
}
</script>