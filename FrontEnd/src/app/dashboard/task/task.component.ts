import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Task>([]);
  displayColumns = [ "projectId", "description", "startDate", "endDate", "status", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(
      (data: Task[]) => {
        console.log(data);
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

}
