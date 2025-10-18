const Task = require('../model/Task');

class TaskRepository {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  save(task) {
    if (!task.id) {
      task.id = this.nextId++;
      task.createdAt = new Date();
      task.updatedAt = new Date();
      this.tasks.push(task);
    } else {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        task.updatedAt = new Date();
        this.tasks[index] = task;
      }
    }
    return task;
  }

  findById(id) {
    return this.tasks.find(task => task.id === id);
  }

  findAll(filter = {}) {
    let filteredTasks = [...this.tasks];

    if (filter.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filter.status);
    }

    return filteredTasks;
  }

  findOverdue() {
    return this.tasks.filter(task => task.isOverdue());
  }

  delete(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  // Método para inicializar con datos de prueba
  initializeWithSampleData() {
    const sampleTasks = [
      new Task(null, 'Completar parcial 2', 'Implementar API REST con arquitectura limpia', 'in-progress', '2025-10-20', null, null),
      new Task(null, 'Revisar código', 'Hacer code review del proyecto', 'pending', '2025-10-19', null, null),
      new Task(null, 'Preparar presentación', 'Crear slides para la defensa', 'pending', '2025-10-18', null, null)
    ];

    sampleTasks.forEach(task => this.save(task));
  }
}

module.exports = TaskRepository;