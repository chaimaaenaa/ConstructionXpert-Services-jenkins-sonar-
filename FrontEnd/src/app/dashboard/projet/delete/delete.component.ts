import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/services/projet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent   {

  id!: number;
  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private projetService: ProjetService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location:Location
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam, 10);
      this.loading = false;
    } else {
      this.showError('No project ID provided');
      this.navigateBack();
    }
  }

  deleteProject(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.projetService.deleteProject(this.id).pipe(
      catchError((error) => {
        this.loading = false;
        this.errorMessage = `Error deleting project: ${error.message}`;
        return EMPTY;
      })
    ).subscribe(() => {
      this.loading = false;
      this.successMessage = 'Project deleted successfully';
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

