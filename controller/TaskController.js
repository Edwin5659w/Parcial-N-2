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
      // convertir id a número y validar
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }

      const task = this.taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
      }

      res.status(200).json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }

      // asegúrate de que req.body exista
      if (!req.body) {
        return res.status(400).json({ success: false, error: 'Body vacío' });
      }

      const { status } = req.body;
      const updateDTO = new UpdateTaskStatusDTO(status);

      const updated = this.taskService.updateTaskStatus(id, updateDTO);
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      // si el service lanza "Tarea no encontrada" lo devolvemos como 404
      const code = error.message === 'Tarea no encontrada' ? 404 : 400;
      res.status(code).json({ success: false, error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ success: false, error: 'ID inválido' });
      }

      this.taskService.deleteTask(id);
      res.status(200).json({ success: true, message: 'Tarea eliminada' });
    } catch (error) {
      const code = error.message === 'Tarea no encontrada' ? 404 : 500;
      res.status(code).json({ success: false, error: error.message });
    }
  }

  async getOverdueTasks(req, res) {
    try {
      const tasks = this.taskService.getOverdueTasks(new Date());
      res.status(200).json({ success: true, data: tasks, count: tasks.length });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = TaskController;
