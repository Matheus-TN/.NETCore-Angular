import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseUrl = `${environment.UrlPrincipal}/api/professor`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.baseUrl}`);
  }

  // tslint:disable-next-line:typedef
  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  post(professor: Professor) {
    return this.http.post(`${this.baseUrl}`, professor);
  }

  // tslint:disable-next-line:typedef
  put(professor: Professor) {
    return this.http.put(`${this.baseUrl}/${professor.id}`, professor);
  }

  // tslint:disable-next-line:typedef
  delete(id: number): Observable<Professor> {
    return this.http.delete<Professor>(`${this.baseUrl}/${id}`);
  }
}
