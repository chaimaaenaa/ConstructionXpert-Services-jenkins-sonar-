import { Component,AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements AfterViewInit{


  constructor(private authService:AuthService){}

  ngAfterViewInit(): void {
    this.authService.logout();
  }

}
