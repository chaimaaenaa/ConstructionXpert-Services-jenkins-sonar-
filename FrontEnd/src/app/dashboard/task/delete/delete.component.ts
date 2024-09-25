import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Location } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  id!: number;
  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam, 10);
      this.loading = false;
    } else {
      this.showError('No task ID provided');
      this.navigateBack();
    }
  }

  deleteTask(): void {  // Change deleteProject to deleteTask to match task-related naming
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.taskService.deleteTask(this.id).pipe(
      catchError((error) => {
        this.loading = false;
        this.errorMessage = `Error deleting task: ${error.message}`;
        return EMPTY;
      })
    ).subscribe(() => {
      this.loading = false;
      this.successMessage = 'Task deleted successfully';
      setTimeout(() => this.navigateBack(), 2000);
    });
  }

  cancel(): void {
    this.navigateBack();
  }

  private navigateBack(): void {
    this.location.back();
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['success-snackbar'] });
  }
}