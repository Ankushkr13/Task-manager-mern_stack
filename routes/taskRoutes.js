// backend/routes/taskRoutes.js
import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks or filter by completion status
router.get('/tasks', async (req, res) => {
    try {
        const { completed } = req.query;
        console.log('Query parameters:', req.query); // Debugging statement
        const filter = completed ? { completed: completed === 'true' } : {};
        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/tasks', async (req, res) => {
    console.log('Request body:', req.body); // Debugging statement
    const task = new Task({
        name: req.body.name,
        subject: req.body.subject,
        date: req.body.date,
        description: req.body.description,
        completed: req.body.completed,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
    try {
        console.log('Update request body:', req.body); // Debugging statement
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.name = req.body.name || task.name;
        task.subject = req.body.subject || task.subject;
        task.date = req.body.date || task.date;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

       
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
