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
      todos: reactive([]),
      newTodo: reactive({})
    }
  },
  methods: {
    getDataFromAddTodo(data) {
      if (data.content === '' || data.category === null) {
        return
      }
      const newTodo = {}
      this.todos.push(newTodo)
      this.newTodo = newTodo // Update newTodo object with new data
    },
  },
  deletePassedTodo(localTodoItem) {
    this.todos = this.todos.filter((t) => t !== localTodoItem)
  },
  async created() {
    try {
      // first Axios request
      const response = await axios.get('http://localhost:8000/get-todos')
      const result1 = response.data
      this.todos = result1

      // second Axios request
      if (Object.keys(this.newTodo) !== undefined) {
        await axios.post('http://localhost:8000/todo', {
          content: this.newTodo.content,
          category: this.newTodo.category,
          done: this.newTodo.done,
          editable: this.newTodo.done,
        })
      }
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    todos_asc() {
      return [...this.todos].sort((a, b) => b.id - a.id)
    }
  }
}
</script>