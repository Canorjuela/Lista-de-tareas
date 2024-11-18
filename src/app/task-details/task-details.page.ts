import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  task: Task | undefined; // Almacena la tarea seleccionada

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.loadTaskDetails(); // Cargar detalles de la tarea al iniciar
  }

  loadTaskDetails() {
    const taskId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la URL
    if (taskId) {
      this.task = this.taskService.getTaskById(taskId); // Obtiene la tarea del servicio
      if (!this.task) {
        console.error('Tarea no encontrada');
        this.router.navigate(['/home']); // Redirige a Home si no encuentra la tarea
      }
    }
  }

  editTask() {
    if (this.task) {
      this.router.navigate(['/create-task'], {
        queryParams: { id: this.task.id },
      }); // Redirige a la página de creación con parámetros
    }
  }

  deleteTask() {
    if (this.task) {
      this.taskService.deleteTask(this.task.id); // Elimina la tarea del servicio
      this.router.navigate(['/home']); // Redirige a la página principal
    }
  }
}
