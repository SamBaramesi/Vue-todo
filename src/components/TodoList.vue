<template>
    <section class="todo-list">
        <div class="list" id="todo-list">

            <div v-for="todo in todos_asc" :key="todo.createAt" :class="`todo-item ${todo.done && 'done'}`">
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
                    <button class="delete" @click="removeTodo(todo)">Delete</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { todos } from './AddTodo.vue'

    export default {
        name: 'TodoList',
        data() {
            return {
                todos: todos
            }
        },
        computed: {
            todos_asc() {
                this.todos.sort((a, b) => {
                    return a.createAt - b.createAt
                })
            }
        }
    }
</script>