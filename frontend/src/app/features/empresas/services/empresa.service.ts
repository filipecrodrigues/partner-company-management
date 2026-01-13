import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = 'http://localhost:8080/api/empresas';

  // 🔔 evento de atualização
  private refreshEmpresas$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  onRefresh(): Observable<void> {
    return this.refreshEmpresas$.asObservable();
  }

  notifyRefresh() {
    this.refreshEmpresas$.next();
  }

  criar(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.API, empresa);
  }

  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API);
  }

  buscarPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.API}/${id}`);
  }

  atualizar(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.API}/${id}`, empresa);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
