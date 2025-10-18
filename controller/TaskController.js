const TaskService = require('../service/TaskService');
const { CreateTaskDTO, UpdateTaskStatusDTO } = require('../dto/TaskDTO');

class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req, res) {
    try {
      const { title, description, dueDate } = req.body;

      const createTaskDTO = new CreateTaskDTO(title, description, dueDate);

      const task = this.taskService.createTask(createTaskDTO);

      res.status(201).json({
        success: true,
        data: task,
        message: 'Tarea creada exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getTasks(req, res) {
    try {
      const { status } = req.query;

      const filter = {};
      if (status) {
        filter.status = status;
      }

      const tasks = this.taskService.getTasks(filter);

      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const taskId = parseInt(id);

      if (isNaN(taskId)) {
        return res.status(400).json({
          success: false,
          error: 'ID de tarea inválido'
        });
      }

      const task = this.taskService.getTaskById(taskId);

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      if (error.message === 'Tarea no encontrada') {
        res.status(404).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const taskId = parseInt(id);

      if (isNaN(taskId)) {
        return res.status(400).json({
          success: false,
          error: 'ID de tarea inválido'
        });
      }

      const updateStatusDTO = new UpdateTaskStatusDTO(status);

      const updatedTask = this.taskService.updateTaskStatus(taskId, updateStatusDTO);

      res.status(200).json({
        success: true,
        data: updatedTask,
        message: 'Estado de tarea actualizado exitosamente'
      });
    } catch (error) {
      if (error.message === 'Tarea no encontrada') {
        res.status(404).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(400).json({
          success: false,
          error: error.message
        });
      }
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const taskId = parseInt(id);

      if (isNaN(taskId)) {
        return res.status(400).json({
          success: false,
          error: 'ID de tarea inválido'
        });
      }

      const result = this.taskService.deleteTask(taskId);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      if (error.message === 'Tarea no encontrada') {
        res.status(404).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    }
  }

  async getOverdueTasks(req, res) {
    try {
      const overdueTasks = this.taskService.getOverdueTasks();

      res.status(200).json({
        success: true,
        data: overdueTasks,
        count: overdueTasks.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = TaskController;