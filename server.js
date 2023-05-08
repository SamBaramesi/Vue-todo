const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const uri = 'mongodb+srv://sbaramesi:Hossein1998@todo-list-db.jr1nttt.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB using mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema for a Todo item
const todoSchema = new mongoose.Schema({
    content: String,
    category: String,
    done: Boolean,
    editable: Boolean
});

// Create a Todo model
const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/name', (req, res) => {

})

app.get('/api/get-todos/:todoId', (req, res) => {

})




app.post('/todo', (req, res) => {
    // Create a new Todo instance based on the req.body data
    console.log(req.body)

    const newTodo = new Todo({
        content: req.body.content,
        category: req.body.category,
        done: req.body.done,
        editable: req.body.editable
    });

    newTodo.save()
        .then(() => {
            // Send a response to the client
            res.send('Todo added successfully');
        })
        .catch(err => {
            // Send an error response to the client
            res.status(500).send(err.message);
        });
});

// Define a route for the homepage
app.get('/todo', async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.send(todos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching todos from database');
    }
  });

// Start the server
app.listen(8000, () => {
    console.log('App is listening on port 8000');
})