const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://Gauri:hjBYeojnDvZj4SFi@ac-7r6jtf5-shard-00-00.vm19r2h.mongodb.net:27017,ac-7r6jtf5-shard-00-01.vm19r2h.mongodb.net:27017,ac-7r6jtf5-shard-00-02.vm19r2h.mongodb.net:27017/todos?ssl=true&replicaSet=atlas-8psgch-shard-0&authSource=admin&retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todos/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todos/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

// app.put('/todo/update/:id', async (req, res) => {
// 	const todo = await Todo.findById(req.params.id);

// 	todo.text = req.body.text;

// 	todo.save();

// 	res.json(todo);
// });

app.put('/todos/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.listen(3005);