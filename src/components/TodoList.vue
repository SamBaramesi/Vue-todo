<template>
    <section class="todo-list">
        <div class="list" id="todo-list">
            {{ todo }}
            <div v-for="todo in orderedTodos" :key="todo.id" :class="`todo-item ${todo.done && 'done'}`">
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
    export default {
        name: 'TodoList',
        data() {
            return {
            }
        },
        props: {
            orderedTodos: {
                type: Array,
                default: () => []
            }
        }
    }
</script>