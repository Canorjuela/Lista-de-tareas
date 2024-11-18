import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = []; // Arreglo para almacenar las tareas

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.loadTasks(); // Cargar las tareas al iniciar la página
    this.addDefaultTasks(); // Añadir tareas por defecto 
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks(); // Obtiene las tareas del servicio
  }

  addDefaultTasks() {
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
      this.loadTasks();
    }
  }

  goToCreateTask() {
    // Redirigir a la página de crear tarea
    this.router.navigate(['/create-task']);  
  }

  goToTaskDetails(id: string) {
    // Redirigir a la página de detalles de la tarea pasando el ID
    this.router.navigate([`/task-details/${id}`]);  
  }
}
