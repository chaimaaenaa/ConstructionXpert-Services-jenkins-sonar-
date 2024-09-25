import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/services/projet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  projectForm!: FormGroup;
  projectId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.projectId = +idParam;
      this.initForm();
      this.loadProjectData();
    } else {
      this.showError('Invalid project ID');
      this.location.back();
    }
  }

  initForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [''],
      endDate: [''],
      budget: ['']
    });
  }

  loadProjectData() {
    this.projetService.getProjectById(this.projectId).subscribe(
      (project) => {
        if (project) {
          this.projectForm.patchValue(project);
        } else {
          this.showError('Project not found');
          this.location.back();
        }
      },
      (error) => {
        this.showError('Failed to load project data');
        console.error('Error loading project:', error);
        this.location.back();
      }
    );
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const updatedProject = { ...this.projectForm.value, id: this.projectId };
      this.projetService.updateProject(this.projectId, updatedProject).subscribe(
        () => {
          this.showSuccess('Project updated successfully');
          this.location.back();
        },
        (error) => {
          this.showError('Failed to update project');
          console.error('Error updating project:', error);
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
}
