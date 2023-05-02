<template>
    <section class="create-todo">
        <form id="new-todo-form" @submit.prevent="addTodo">

            <h4>What's on your todo list?</h4>
            <input type="text" name="content" id="content" placeholder="e.g. make a video" v-model="input_content" />

            <h4>Pick a category</h4>
            <div class="options">

                <label>
                    <input type="radio" name="category" id="category1" value="business" v-model="input_category" />
                    <span class="bubble business"></span>
                    <div>Business</div>
                </label>

                <label>
                    <input type="radio" name="category" id="category2" value="personal" v-model="input_category" />
                    <span class="bubble personal"></span>
                    <div>Personal</div>
                </label>

            </div>
            <input type="submit" value="Add todo" />
        </form>
        <hr>
    </section>
</template>


<script>
import { reactive } from 'vue'


export default {
    name: 'AddTodo',
    data() {
        return {
            input_content: '',
            input_category: null,
            todos: reactive([])
        }
    },
    methods: {
        addTodo() {
            if (this.input_content.trim() === '' || this.input_category === null ) {
                return
            }
            this.todos.push({
                content: this.input_content,
                category: this.input_category,
                done: false,
                editable: false,
                createdAt: new Date().getTime()
            })
            this.input_content = ''
        }
    }
}

</script>

<style scoped>
hr {
    margin-top: 10px;
}
</style>