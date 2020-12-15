import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Aluno } from '../models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  baseUrl = `${environment.UrlPrincipal}/api/aluno`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.baseUrl}`);
  }

  // tslint:disable-next-line:typedef
  getById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.baseUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  post(aluno: Aluno) {
    return this.http.post(`${this.baseUrl}`, aluno);
  }

  // tslint:disable-next-line:typedef
  put(aluno: Aluno) {
    return this.http.put(`${this.baseUrl}/${aluno.id}`, aluno);
  }

  // tslint:disable-next-line:typedef
  delete(id: number): Observable<Aluno> {
    return this.http.delete<Aluno>(`${this.baseUrl}/${id}`);
  }
}
