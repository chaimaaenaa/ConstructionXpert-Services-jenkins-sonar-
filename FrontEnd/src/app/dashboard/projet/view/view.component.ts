import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from 'src/app/services/projet.service';
import { Projet } from 'src/app/models/projet';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent  implements OnInit {

  projet!:Projet;

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private location:Location
  ) { }


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProjet(id);
    }
  }



  loadProjet(id:string):void{
    this.projetService.getProjectById(parseInt(id)).subscribe(
      data => {
        this.projet = data;
      },
      error => {
        console.error('Error fetching project with id :'+ `${id}`, error);
      }
    );
  }


  goBack(){
    this.location.back();
  }

}
