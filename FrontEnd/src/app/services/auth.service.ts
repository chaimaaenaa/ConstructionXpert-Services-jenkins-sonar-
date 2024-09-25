import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwt } from '../models/Jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginData } from '../models/LoginData';
import { RegisterData } from '../models/RegisterData';
import { tap } from 'rxjs/operators';  // Import tap

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = "http://localhost:8765/api/users";
  private readonly TOKEN_KEY = 'jwt';
  private readonly ROLE_KEY = 'role';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  register(registerdata: RegisterData): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.BASE_URL}/register`, registerdata);
  }

  login(logindata: LoginData): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.BASE_URL}/authenticate`, logindata).pipe(
      tap((response: Jwt) => {
        if (response && response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.ROLE_KEY, response.role);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }



  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


}
