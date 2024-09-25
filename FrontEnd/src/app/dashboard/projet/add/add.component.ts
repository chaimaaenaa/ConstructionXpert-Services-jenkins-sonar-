import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from 'src/app/services/projet.service';
import { Location } from '@angular/common';
import { Projet } from 'src/app/models/projet';  // Assurez-vous que le modèle est importé

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  projetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.projetForm = this.fb.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.min(0)]]
    }, { validators: this.dateValidation });
  }

  // Méthode pour valider que la date de fin est postérieure à la date de début
  dateValidation(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    return endDate && startDate && endDate > startDate ? null : { dateInvalid: true };
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.projetForm.valid) {
      const newProjet = this.projetForm.value;
      this.projetService.createProject(newProjet).subscribe(  // Utilisation de createProject
        (response: Projet) => {
          console.log('Project created successfully', response);
          this.location.back();
        },
        (error: any) => {
          console.error('Error creating project', error);
        }
      );
    } else {
      Object.values(this.projetForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
