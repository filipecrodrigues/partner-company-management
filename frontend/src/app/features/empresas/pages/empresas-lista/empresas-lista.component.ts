import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaCardComponent } from '../../components/empresa-card/empresa-card.component';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    EmpresaCardComponent
  ],
  templateUrl: './empresas-lista.component.html',
  styleUrls: ['./empresas-lista.component.scss']
})
export class EmpresasListaComponent implements OnInit {

  empresas: Empresa[] = [];
  searchTerm = '';

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {

    /* ============================
       MODO MOCK (layout / visual)
       ============================ */
    this.empresas = [
      {
        id: 99,
        cnpj: '00.000.000/0001-00',
        razaoSocial: 'Empresa Exemplo LTDA',
        nomeFantasia: 'Exemplo Corp',
        atividadeEconomica: 'Serviços Gerais',
        endereco: 'Rua Exemplo, 123',
        telefone: '(00) 90000-0000'
      },
      {
        id: 100,
        cnpj: '11.111.111/0001-11',
        razaoSocial: 'Empresa Teste Dois SA',
        nomeFantasia: 'Teste Dois',
        atividadeEconomica: 'Consultoria em TI',
        endereco: 'Av. Central, 456',
        telefone: '(11) 98888-7777'
      }
    ];

    // PRODUÇÃO
    // this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresaService.listar().subscribe({
      next: dados => this.empresas = dados,
      error: err => console.error('Erro ao carregar empresas', err)
    });
  }

  buscar(): void {
    if (!this.searchTerm) return;

    const term = this.searchTerm.trim().toLowerCase();
    this.empresas = this.empresas.filter(emp =>
      emp.cnpj.toLowerCase().includes(term) ||
      emp.razaoSocial.toLowerCase().includes(term)
    );
  }

  editar(id: number): void {
    console.log('Editar empresa', id);
    // edição virá depois com modal
  }

  deletar(id: number): void {
    if (!confirm('Deseja realmente deletar esta empresa?')) return;

    this.empresaService.deletar(id).subscribe({
      next: () => this.carregarEmpresas(),
      error: err => console.error('Erro ao deletar', err)
    });
  }

  get empresasFiltradas(): Empresa[] {
    if (!this.searchTerm) return this.empresas;

    const term = this.searchTerm.toLowerCase();
    return this.empresas.filter(emp =>
      emp.cnpj.toLowerCase().includes(term) ||
      emp.razaoSocial.toLowerCase().includes(term)
    );
  }
}


/**
Teste mocks dados para facilitar validação do visual

👉 Para usar MOCK   
this.empresas = [ ... ];  para usar o mock
// this.carregarEmpresas();


👉 Para usar BACKEND
// this.empresas = [ ... ];
this.carregarEmpresas(); para usar usar o backend

 */