const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://sbaramesi:Hossein1998@cluster-todolist-v2.d4mtt8r.mongodb.net/vue-todos?retryWrites=true&w=majority';

// Connect to MongoDB using mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

app.post('/todo', (req, res) => {
    // Create a new Todo instance based on the req.body data
    console.log(req.body)

    const newTodo = new Todo({
        content: req.body.content,
        category: req.body.category,
        done: req.body.done,
        editable: req.body.editable
    });

    newTodo.save().then(() => {
        // Send a response to the client
        res.send(newTodo);
    }).catch(err => {
        // Send an error response to the client
        res.status(500).send(err.message);
    });
});

app.put('/update-todo/:id', (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;
    Todo.findByIdAndUpdate(todoId, updatedTodo)
        .then(updatedTodo => {
            res.status(200).json(updatedTodo);
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to update the todo' });
        });
});

// Define a route for the homepage
app.get('/get-todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        if (todos.length === 0) {
            return res.status(404).send('You have no todos');
        }
        res.send(todos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching todos from database');
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.delete('/del-todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        console.log(todoId);

        // Find and delete the todo item by ID
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(8000, () => {
    console.log('App is listening on port 8000');
})