import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit, AfterViewInit {

  projets: Projet[] = [];
  dataSource = new MatTableDataSource<Projet>([]);
  displayColumns = ["id", "name", "startDate", "endDate", "description", "budget", "action"];
  selection = new SelectionModel<Projet>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private projetService: ProjetService
  ) {}

  ngOnInit() {
    this.loadProjets();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadProjets() {
    this.projetService.getAllProjects().subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.dataSource.data = this.projets;
        console.log(this.projets);
      },
      (error: any) => { // Specify the type of error if possible
        console.log('Error fetching projets', error);
      }
    );
  }
}
