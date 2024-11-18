import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service'; // Importa el servicio
import { Task } from '../models/task.model'; // Importa la interfaz Task

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = []; // Arreglo para almacenar las tareas

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks(); // Cargar las tareas al iniciar la página
    this.addDefaultTasks(); // Añadir tareas por defecto si no hay tareas en el servicio
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks(); // Obtiene las tareas del servicio
  }

  addDefaultTasks() {
    // Solo agregar tareas si el servicio está vacío
    if (this.tasks.length === 0) {
      this.taskService.addTask({
        id: '1',
        title: 'Reunion ventas',
        description: 'Reunion del equipo de ventas',
        dueDate: new Date(),
        priority: 'medium',
        completed: true,
      });
      this.taskService.addTask({
        id: '2',
        title: 'Entrega Previa 2',
        description: 'Entrega 2 Programacion movil',
        dueDate: new Date(),
        priority: 'high',
        completed: false,
      });
      // Ahora las tareas deberían cargarse en la vista
      this.loadTasks();
    }
  }
}
