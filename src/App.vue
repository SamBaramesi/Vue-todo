<template>
  <main class="app">
    <GreetingSection />
    <AddTodo @passData="getDataFromAddTodo" />
    <TodoList :orderedTodos="orderedTodos" />
  </main>
</template>

<script>
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
    }
  },
  computed: {
    todos_asc() {
      const orderedTodos= [...this.todos].sort((a, b) => { a.id - b.id })
      return orderedTodos
    }
  }
}

</script>