import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RessourceService } from 'src/app/services/ressource.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {Resource} from "../../models/ressource";

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit, AfterViewInit {

  ressources: Resource[] = [];
  dataSource = new MatTableDataSource<Resource>([]);
  displayColumns = ["id","taskId", "name", "type", "quantity", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.loadRessources();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadRessources() {
    this.ressourceService.getAllRessources().subscribe(
      (data: Resource[]) => {
        this.ressources = data;
        this.dataSource.data = this.ressources;
        console.log(this.ressources);
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }
}
