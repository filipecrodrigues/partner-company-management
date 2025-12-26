import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/empresa.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/empresas'; // substitua pelo seu backend

  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.baseUrl);
  }

  salvar(empresa: Empresa) {
    return this.http.post(this.baseUrl, empresa);
  }

  atualizar(id: number, empresa: Empresa) {
    return this.http.put(`${this.baseUrl}/${id}`, empresa);
  }

  excluir(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
