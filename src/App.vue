<template>
  <main class="app">
    <GreetingSection />
    <AddTodo @passData="getDataFromAddTodo" />
    <TodoList @getPassedTodo="deletePassedTodo" :todos_asc="todos_asc" />
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
      try {
        const response = await axios.post('http://localhost:8000/todo', {
          content: data.content,
          category: data.category,
          done: false,
          editable: false,
        });
        const newTodo = response.data; // Retrieve the new todo object from the server response
        this.todos.push(newTodo); // Add the new todo object to the todos array
      } catch (error) {
        console.error(error);
      }
    },
    deletePassedTodo(localTodoItem) {
      console.log(`this is the ${localTodoItem._id} ${localTodoItem.content}`)
      axios
        .delete(`http://localhost:8000/del-todos/${localTodoItem._id}`)
        .then(response => {
          if (response.status === 200) {
            // Handle successful deletion
            const todoIndex = this.todos.findIndex(todo => todo._id === localTodoItem._id);
            this.todos.splice(todoIndex, 1);
          }
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    },
    getCreatedAtTimestamp(id) {
      // Extract the timestamp from the MongoDB _id field
      const timestamp = parseInt(id.substring(0, 8), 16) * 1000; // Multiply by 1000 to convert to milliseconds
      return timestamp;
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:8000/get-todos')
      if (response.status !== 404 && response.status !== 500) {
        const result1 = response.data
        this.todos = result1
        console.log("Todos loaded successfully")
      }
    }
    catch (error) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error.message);
      }
    }
  },
  computed: {
    todos_asc() {
      const undoneTodos = this.todos.filter(todo => !todo.done);
      const doneTodos = this.todos.filter(todo => todo.done);
      undoneTodos.sort((a, b) => this.getCreatedAtTimestamp(b._id) - this.getCreatedAtTimestamp(a._id));
      doneTodos.sort((a, b) => this.getCreatedAtTimestamp(b._id) - this.getCreatedAtTimestamp(a._id));
      return [...undoneTodos, ...doneTodos];
    }
  }
};
</script>