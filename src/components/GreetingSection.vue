<template>
    <section class="greeting">
      <h2 class="title">
        What's up,
        <input type="text" id="name" placeholder="Name here" v-model="name" @input="saveName">
      </h2>
    </section>
  </template>
  
  <script>
  export default {
    name: "GreetingSection",
    data() {
      return {
        name: ""
      }
    },
    mounted() {
      // Retrieve the name from localStorage
      this.name = localStorage.getItem("name") || "";
    },
    methods: {
      saveName() {
        // Save the name to localStorage
        localStorage.setItem("name", this.name);
      }
    }
  }
  </script>