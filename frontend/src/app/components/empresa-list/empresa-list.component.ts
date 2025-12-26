import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaModalComponent } from '../empresa-modal/empresa-modal.component';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EmpresaModalComponent],
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent {
  empresas: Empresa[] = [];
  filtro = '';
  empresaSelecionada?: Empresa; // Objeto usado para o modal

  constructor(private empresaService: EmpresaService) {
    this.carregarEmpresas();
  }

  /** Carrega todas as empresas do backend */
  carregarEmpresas() {
    this.empresaService.listar().subscribe(data => this.empresas = data);
  }

  /** Abre o modal para editar uma empresa existente */
  editar(emp: Empresa) {
    this.empresaSelecionada = { ...emp };
  }

  /** Exclui uma empresa */
  excluir(id?: number) {
    if (!id || !confirm('Deseja excluir esta empresa?')) return;
    this.empresaService.excluir(id).subscribe(() => this.carregarEmpresas());
  }

  /** Abre o modal para criar uma nova empresa */
  novo() {
    // Inicializa com um objeto vazio do tipo Empresa
    this.empresaSelecionada = {
      id: undefined,
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      atividadeEconomica: '',
      endereco: '',
      telefone: ''
    };
  }

  /** Retorna a lista filtrada pelo input de busca */
  get empresasFiltradas() {
    return this.empresas.filter(e =>
      e.cnpj.toLowerCase().includes(this.filtro.toLowerCase()) ||
      e.razaoSocial.toLowerCase().includes(this.filtro.toLowerCase()) ||
      e.nomeFantasia.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
