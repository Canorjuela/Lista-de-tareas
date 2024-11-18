import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service'; // Servicio de tareas
import { Task } from '../models/task.model'; // Interfaz Task
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'low',
    completed: false
  };

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {}

  saveTask() {
    this.task.id = new Date().toISOString(); // Asignar un ID único, por ejemplo, el timestamp
    this.taskService.addTask(this.task); // Agregar la tarea al servicio
    this.router.navigate(['/home']); // Volver a la página principal
  }
}
