<template>
  <main class="app">
    <GreetingSection />
    <AddTodo @passData="getDataFromAddTodo" />
    <TodoList @passTodo="removeTodo" @getPassedTodo="deletePassedTodo" :todos_asc="todos_asc" />
  </main>
</template>

<script>
import axios from 'axios'
import GreetingSection from './components/GreetingSection.vue';
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';
import { reactive } from 'vue';

export default {
  name: 'App',
  components: {
    GreetingSection,
    AddTodo,
    TodoList,
  },
  data() {
    return {
      todos: reactive([])
    }
  },
  methods: {
    getDataFromAddTodo(data) {
      if (data.content === '' || data.category === null) {
        return
      }
      this.todos.push({
        id: this.todos.length + 1,
        content: data.content,
        category: data.category,
        done: false,
        editable: false,
      })
    },
    deletePassedTodo(localTodoItem) {
      this.todos = this.todos.filter((t) => t !== localTodoItem)
    },
  },
  async created() {
    const response = await axios.get('http://localhost:8000/todo')
    const todos = response.data
    this.todos = todos
  },
  computed: {
    todos_asc() {
      return [...this.todos].sort((a, b) => b.id - a.id)
    }
  }
}
</script>