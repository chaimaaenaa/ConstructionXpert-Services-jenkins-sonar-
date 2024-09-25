import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RessourceService } from 'src/app/services/ressource.service';
import { Location } from '@angular/common';
import {Resource} from "../../../models/ressource";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  ressource!:Resource;

  constructor(
    private route: ActivatedRoute,
    private ressourceService: RessourceService,
    private location:Location
  ) { }


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRessource(id);
    }
  }



  loadRessource(id:string):void{
    this.ressourceService.getRessourceById(parseInt(id)).subscribe(
      data => {
        this.ressource = data;
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
