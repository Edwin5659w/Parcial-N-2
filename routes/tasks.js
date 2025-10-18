const express = require('express');
const TaskController = require('../controller/TaskController');

const router = express.Router();
const taskController = new TaskController();

// POST /tasks → crea tarea
router.post('/', (req, res) => taskController.createTask(req, res));

// GET /tasks?status=... → lista/filtra
router.get('/', (req, res) => taskController.getTasks(req, res));

// PATCH /tasks/:id/status (body: {status}) → actualiza estado
router.patch('/:id/status', (req, res) => taskController.updateTaskStatus(req, res));

// DELETE /tasks/:id → elimina
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

// (Opcional) GET /tasks/overdue → vencidas
router.get('/overdue', (req, res) => taskController.getOverdueTasks(req, res));

module.exports = router;