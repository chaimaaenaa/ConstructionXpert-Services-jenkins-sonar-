import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from 'src/app/services/ressource.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  ressourceForm!: FormGroup;
  ressourceId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ressourceService: RessourceService,
    private snackBar: MatSnackBar,
    private location:Location
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.ressourceId = +idParam;
      this.initForm();
      this.loadressourceData();
    } else {
      this.showError('Invalid project ID');
      this.location.back();
    }
  }

  initForm() {
    this.ressourceForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: [''],
      quantity: [''],
      taskId: ['']
    });
  }

  loadressourceData() {
    this.ressourceService.getRessourceById(this.ressourceId).subscribe(
      (project) => {
        if (project) {
          this.ressourceForm.patchValue(project);
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
    if (this.ressourceForm.valid) {
      const updatedProject = { ...this.ressourceForm.value, id: this.ressourceId };
      this.ressourceService.editRessource(this.ressourceId, updatedProject).subscribe(
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

