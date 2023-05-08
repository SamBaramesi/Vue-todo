<template>
    <section class="greeting">
        <h2 class="title">What's up, <input type="text" id="name" placeholder="Name here" v-model="name"></h2>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: "GreetingSection",
    data() {
        return {
            name: ""
        }
    },
    async created() {
        const response = await axios.get('/api/get-name')
        const name = response.data
        this.name = name
    }
}
</script>