import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { CadastroComponent } from '../../components/cadastro/cadastro.component';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './empresas-lista.component.html',
  styleUrls: ['./empresas-lista.component.scss']
})
export class EmpresasListaComponent implements OnInit {
  empresas: Empresa[] = [];
  searchTerm: string = '';

  constructor(
    private empresaService: EmpresaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.empresaService.listar().subscribe({
      next: (dados) => this.empresas = dados,
      error: (err) => console.error('Erro ao carregar empresas', err)
    });
  }

  abrirCadastro(): void {
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((sucesso: boolean) => {
      if (sucesso) {
        this.carregarEmpresas();
      }
    });
  }

  buscar(): void {
    if (!this.searchTerm) {
      this.carregarEmpresas();
      return;
    }

    const term = this.searchTerm.trim().toLowerCase();
    this.empresas = this.empresas.filter(emp =>
      emp.cnpj.toLowerCase().includes(term) ||
      emp.razaoSocial.toLowerCase().includes(term)
    );
  }

  editar(id: number) {
    console.log('Editar empresa', id);
  }

  deletar(id: number) {
    if (!confirm('Deseja realmente deletar esta empresa?')) return;

    this.empresaService.deletar(id).subscribe({
      next: () => this.carregarEmpresas(),
      error: (err) => console.error('Erro ao deletar', err)
    });
  }

  get empresasFiltradas() {
    if (!this.searchTerm) return this.empresas;
    const term = this.searchTerm.toLowerCase();
    return this.empresas.filter(emp =>
      emp.cnpj.toLowerCase().includes(term) ||
      emp.razaoSocial.toLowerCase().includes(term)
    );
  }
}
