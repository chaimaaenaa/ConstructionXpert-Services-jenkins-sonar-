import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { RessourceService } from 'src/app/services/ressource.service';
import { Location } from '@angular/common';
import { Resource } from "../../../models/ressource";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  ressourceForm!: FormGroup;
  tasks: Task[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private ressourceService: RessourceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.ressourceForm = this.fb.group({
      nom: ['', Validators.required],
      typee: ['', Validators.required],
      quantity: ['', Validators.required],
      taskId: [null, Validators.required]
    });

    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addRessource(): void {
    if (this.ressourceForm.valid) {
      const newRessource: Resource = this.ressourceForm.value;

      this.ressourceService.createRessource(newRessource, newRessource.taskId).subscribe(() => {
        console.log('Ressource added successfully!');
        this.location.back();
      });
    }
  }
}
