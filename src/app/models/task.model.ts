export interface Task {
    id: string; // Identificador único de la tarea
    title: string; // Título de la tarea
    description: string; // Descripción de la tarea (opcional)
    dueDate: Date; // Fecha de vencimiento
    priority: 'low' | 'medium' | 'high'; // Prioridad de la tarea
    completed: boolean; // Indicador de si la tarea está completada
  }
  