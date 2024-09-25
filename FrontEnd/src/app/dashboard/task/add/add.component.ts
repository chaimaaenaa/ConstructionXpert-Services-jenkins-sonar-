import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { ProjetService } from 'src/app/services/projet.service';
import { Location } from '@angular/common';
import { Projet } from 'src/app/models/projet';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  taskForm!: FormGroup;
  projects: Projet[] = [];
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      projectId: [null, Validators.required]
    });

    this.projectService.getAllProjects().subscribe(
      (data: Projet[]) => {
        this.projects = data;
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        startDate: new Date(this.taskForm.value.startDate).toISOString(),
        endDate: new Date(this.taskForm.value.endDate).toISOString()
      };

      console.log(newTask);  // Debugging step to check form data
      this.taskService.createTask(newTask).subscribe(
        () => {
          console.log('Task added successfully!');
          this.location.back();
        },
        (error: any) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }

}
