class Task {
  constructor(id, title, description, status, dueDate, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status; // 'pending', 'in-progress', 'completed'
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isOverdue() {
    return new Date() > new Date(this.dueDate) && this.status !== 'completed';
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
}

module.exports = Task;