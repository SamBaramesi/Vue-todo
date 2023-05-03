<template>
    <section class="todo-list">
        <div class="list" id="todo-list">
            <div v-for="todo in todos_asc" :key="todo.id" :class="`todo-item ${todo.done && 'done'}`">
                <label>
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="`bubble ${todo.category == 'business'
                            ? 'business'
                            : 'personal'
                        }`"></span>
                </label>

                <div class="todo-content">
                    <input type="text" v-model="todo.content" />
                </div>

                <div class="actions">
                    <button class="delete" @click="passTodo(todo)">Delete</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'TodoList',
    data() {
        return {
        }
    },
    props: {
        todos_asc: {
            type: Array,
        }
    },
    methods: {
        passTodo(todo) {
            this.$emit('passTodo', todo)
        }
    }
}
</script>