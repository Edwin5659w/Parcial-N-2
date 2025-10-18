class CreateTaskDTO {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }

  validate() {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('El título es requerido');
    }
    if (!this.dueDate) {
      throw new Error('La fecha de vencimiento es requerida');
    }
    if (new Date(this.dueDate) <= new Date()) {
      throw new Error('La fecha de vencimiento debe ser futura');
    }
  }
}

class UpdateTaskStatusDTO {
  constructor(status) {
    this.status = status;
  }

  validate() {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(this.status)) {
      throw new Error('Estado inválido. Debe ser: pending, in-progress o completed');
    }
  }
}

class TaskResponseDTO {
  constructor(task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.dueDate = task.dueDate;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.isOverdue = task.isOverdue();
  }
}

module.exports = {
  CreateTaskDTO,
  UpdateTaskStatusDTO,
  TaskResponseDTO
};