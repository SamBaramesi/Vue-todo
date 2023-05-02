<template>
    <section class="greeting">
        <h2 class="title">What's up, <input type="text" id="name" placeholder="Name here" v-model="name"></h2>
        <hr>
    </section>
</template>

<script>
export default {
    name: "GreetingSection",
    data() {
        return {
            name: localStorage.getItem("name") || "" // return names value from local storage
        }
    },
    watch: {
        name(newName) {
            localStorage.setItem("name", newName) // write name to local storage whenever it changes
        }
    }
}
</script>

<style scoped>
hr {
    margin-top: 10px;
    width: 25%;
}
</style>