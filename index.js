const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'API de Gestión de Tareas - Parcial 2',
    version: '1.0.0',
    endpoints: {
      'POST /tasks': 'Crear tarea',
      'GET /tasks': 'Listar tareas (opcional: ?status=...)',
      'PATCH /tasks/:id/status': 'Actualizar estado de tarea',
      'DELETE /tasks/:id': 'Eliminar tarea',
      'GET /tasks/overdue': 'Listar tareas vencidas'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`API de Gestión de Tareas - Parcial 2 - DDS2`);
  console.log('Edwin Molina - ID: 408873');
});