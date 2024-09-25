import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Location } from '@angular/common';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  statusOptions: Array<'TODO' | 'IN_PROGRESS' | 'COMPLETED'> = ['TODO', 'IN_PROGRESS', 'COMPLETED'];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.taskId = +idParam;
      this.initForm();
      this.loadTaskData();
    } else {
      this.showError('Invalid task ID');
      this.location.back();
    }
  }

  initForm() {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      projectId: [null, Validators.required]
    });
  }

  loadTaskData() {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task: Task) => {
        if (task) {
          this.taskForm.patchValue({
            description: task.description,
            startDate: task.startDate,
            endDate: task.endDate,
            status: task.status,
            projectId: task.projectId
          });
        } else {
          this.showError('Task not found');
          this.location.back();
        }
      },
      (error) => {
        this.showError('Failed to load task data');
        console.error('Error loading task:', error);
        this.location.back();
      }
    );
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask: Task = { ...this.taskForm.value, id: this.taskId };
      this.taskService.updateTask(this.taskId, updatedTask).subscribe(
        () => {
          this.showSuccess('Task updated successfully');
          this.location.back();
        },
        (error) => {
          this.showError('Failed to update task');
          console.error('Error updating task:', error);
        }
      );
    } else {
      this.showError('Please fill out all required fields');
    }
  }

  onCancel() {
    this.location.back();
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
  }

  protected readonly status = status;
}
