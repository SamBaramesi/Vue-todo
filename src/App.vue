<template>
  <main class="app">
    <GreetingSection />
    <AddTodo />
    <TodoList :todos = "todos"/>
  </main>
</template>

<script>
import GreetingSection from './components/GreetingSection.vue';
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    GreetingSection,
    AddTodo,
    TodoList,
  }
}

</script>