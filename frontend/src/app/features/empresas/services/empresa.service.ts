import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root' // Service global, não precisa importar em módulo
})
export class EmpresaService {

  // URL do backend Java do projeto
  private readonly API = 'http://localhost:8080/api/empresas';

  constructor(private http: HttpClient) {}

  // Criar uma nova empresa
  criar(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.API, empresa);
  }

  // Listar todas as empresas
  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API);
  }

  // Buscar empresa por ID
  buscarPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.API}/${id}`);
  }

  // Atualizar empresa
  atualizar(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.API}/${id}`, empresa);
  }

  // Deletar empresa
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
