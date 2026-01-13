import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Subject, takeUntil } from 'rxjs';

import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaDialogService } from '../../services/empresa-dialog.service';
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
export class EmpresasListaComponent implements OnInit, OnDestroy {

  empresas: Empresa[] = [];
  searchTerm = '';

  private destroy$ = new Subject<void>();

  constructor(
    private empresaService: EmpresaService,
    private dialogService: EmpresaDialogService
  ) {}

  ngOnInit(): void {
    // carga inicial
    this.carregarEmpresas();

    // 🔔 escuta atualizações vindas do modal
    this.empresaService
      .onRefresh()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.carregarEmpresas();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  carregarEmpresas(): void {
    this.empresaService.listar().subscribe({
      next: (dados) => (this.empresas = dados),
      error: (err) => console.error('Erro ao carregar empresas', err)
    });
  }

  abrirCadastro(): void {
    this.dialogService.abrirCadastro();
    // 🔹 refresh já é tratado pelo Subject
  }

  editar(empresa: Empresa): void {
    this.dialogService.abrirEdicao(empresa);
    // 🔹 refresh já é tratado pelo Subject
  }

  deletar(id: number): void {
    if (!confirm('Deseja realmente deletar esta empresa?')) {
      return;
    }

    this.empresaService.deletar(id).subscribe({
      next: () => this.carregarEmpresas(),
      error: (err) => console.error('Erro ao deletar empresa', err)
    });
  }

  get empresasFiltradas(): Empresa[] {
    if (!this.searchTerm.trim()) {
      return this.empresas;
    }

    const term = this.searchTerm.toLowerCase();

    return this.empresas.filter(emp =>
      emp.cnpj.toLowerCase().includes(term) ||
      emp.razaoSocial.toLowerCase().includes(term)
    );
  }
}
