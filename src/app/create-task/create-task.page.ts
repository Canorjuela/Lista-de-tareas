import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  task: Task = { id: '', title: '', description: '', dueDate: new Date(), priority: 'low', completed: false }; // Inicializamos una tarea vacía

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute // Para obtener parámetros de la URL
  ) {}

  ngOnInit() {
    this.loadTask(); // Cargar los datos de la tarea si es que estamos editando
  }

  loadTask() {
    // Obtener el parámetro 'id' de los parámetros de consulta
    this.route.queryParamMap.subscribe(params => {
      const taskId = params.get('id'); // Obtiene el 'id' de la URL

      if (taskId) {
        // Si el id está presente, cargar la tarea desde el servicio
        const taskToEdit = this.taskService.getTaskById(taskId);
        if (taskToEdit) {
          this.task = { ...taskToEdit }; // Copiar los datos de la tarea en el objeto 'task'
        }
      }
    });
  }

  saveTask() {
    // Lógica para guardar la tarea, ya sea nueva o editada
    if (this.task.id) {
      this.taskService.updateTask(this.task); // Si tiene ID, actualizamos la tarea existente
    } else {
      this.task.id = new Date().toISOString(); // Generar ID único para una nueva tarea
      this.taskService.addTask(this.task); // Si no tiene ID, es una tarea nueva
    }

    // Después de guardar la tarea, redirigimos de vuelta a la pantalla principal
    this.router.navigate(['/home']);
  }
}
