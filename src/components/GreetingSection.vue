<template>
    <section class="greeting">
        <h2 class="title">What's up, <input type="text" id="name" placeholder="Name here" v-model="name"></h2>
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
}
</script>