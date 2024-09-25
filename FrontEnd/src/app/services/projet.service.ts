import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = 'http://localhost:8765/api/projects';

  constructor(private http: HttpClient) { }

  createProject(project: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, project);
  }

  getProjectById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: number, project: Projet): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  existProject(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/exist`);
  }

  getAllProjects(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl);
  }
}
