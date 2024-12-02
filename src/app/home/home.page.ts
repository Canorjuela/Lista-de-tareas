import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importar AlertController
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.addDefaultTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addDefaultTasks() {
    if (this.tasks.length === 0) {
      this.taskService.addTask({
        id: '1',
        title: 'Reunión ventas',
        description: 'Reunión del equipo de ventas',
        dueDate: new Date(),
        priority: 'medium',
        completed: true,
      });
      this.taskService.addTask({
        id: '2',
        title: 'Entrega Previa 3',
        description: 'Entrega 3 Programación móvil',
        dueDate: new Date(),
        priority: 'high',
        completed: false,
      });
      this.loadTasks();
    }
  }

  goToCreateTask() {
    this.router.navigate(['/create-task']);
  }

  goToTaskDetails(id: string) {
    this.router.navigate([`/task-details/${id}`]);
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  // Confirmación antes de eliminar
  async confirmDelete(taskId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar Tarea',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteTask(taskId);
          },
        },
      ],
    });

    await alert.present();
  }
}
