const Task = require('../model/Task');
const TaskRepository = require('../repository/TaskRepository');
const { CreateTaskDTO, UpdateTaskStatusDTO, TaskResponseDTO } = require('../dto/TaskDTO');

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  createTask(createTaskDTO) {
    // Validar DTO
    createTaskDTO.validate();

    // Crear nueva tarea
    const task = new Task(
      null,
      createTaskDTO.title.trim(),
      createTaskDTO.description ? createTaskDTO.description.trim() : '',
      'pending', // estado inicial
      createTaskDTO.dueDate,
      null,
      null
    );

    // Guardar en repositorio
    const savedTask = this.taskRepository.save(task);

    // Retornar DTO de respuesta
    return new TaskResponseDTO(savedTask);
  }

  getTasks(filter = {}) {
    const tasks = this.taskRepository.findAll(filter);
    return tasks.map(task => new TaskResponseDTO(task));
  }

  getTaskById(id) {
    const task = this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Tarea no encontrada');
    }
    return new TaskResponseDTO(task);
  }

  updateTaskStatus(id, updateStatusDTO) {
    // Validar DTO
    updateStatusDTO.validate();

    // Buscar tarea
    const task = this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Tarea no encontrada');
    }

    // Actualizar estado
    task.updateStatus(updateStatusDTO.status);

    // Guardar cambios
    const updatedTask = this.taskRepository.save(task);

    // Retornar DTO de respuesta
    return new TaskResponseDTO(updatedTask);
  }

  deleteTask(id) {
    const task = this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Tarea no encontrada');
    }

    const deleted = this.taskRepository.delete(id);
    if (!deleted) {
      throw new Error('Error al eliminar la tarea');
    }

    return { message: 'Tarea eliminada exitosamente' };
  }

  getOverdueTasks() {
    const overdueTasks = this.taskRepository.findOverdue();
    return overdueTasks.map(task => new TaskResponseDTO(task));
  }

  // Método para inicializar datos de prueba
  initializeSampleData() {
    this.taskRepository.initializeWithSampleData();
  }
}

module.exports = TaskService;