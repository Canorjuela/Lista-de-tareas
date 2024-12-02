import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = []; // Lista de tareas

  constructor() {}

  // Obtener todas las tareas
  getTasks(): Task[] {
    return this.tasks;
  }

  // Obtener una tarea por su ID
  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  // Añadir una nueva tarea
  addTask(task: Task): void {
    this.tasks.push(task);
  }

  // Editar una tarea existente
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  // Eliminar una tarea por su ID
  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasksToStorage(); 
  }

  // Guardar tareas en el almacenamiento local
  private saveTasksToStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
