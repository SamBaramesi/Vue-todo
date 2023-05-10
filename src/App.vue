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
    }
  },
  methods: {
    async getDataFromAddTodo(data) {
      if (data.content === '' || data.category === null) {
        return
      }
      await axios.post('http://localhost:8000/todo', {
        id: this.todos.length + 1,
        content: data.content,
        category: data.category,
        done: false,
        editable: false,
      })
      this.todos.push(
        {
          id: this.todos.length + 1,
          content: data.content,
          category: data.category,
          done: false,
          editable: false,
        }
      )
    }
  },
  deletePassedTodo(localTodoItem) {
    this.todos = this.todos.filter((t) => t !== localTodoItem)

    axios.delete('http://localhost:8000/del-todos', localTodoItem)
  },
  async created() {
    try {
      // first Axios request
      const response = await axios.get('http://localhost:8000/get-todos')
      const result1 = response.data
      this.todos = result1

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