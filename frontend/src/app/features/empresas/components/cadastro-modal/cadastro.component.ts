import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  @Input() empresaEditar?: Empresa;

  empresa: Empresa = {
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    atividadeEconomica: '',
    endereco: '',
    telefone: ''
  };

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    if (this.empresaEditar) {
      this.empresa = { ...this.empresaEditar };
    }
  }

  salvar(): void {
    if (this.empresa.cnpj && this.empresa.razaoSocial) {
      this.empresaService.criar(this.empresa).subscribe({
        next: () => {
          console.log('Empresa cadastrada com sucesso!');
          this.cancelar();
        },
        error: (err) => console.error('Erro ao cadastrar empresa', err)
      });
    }
  }

  cancelar(): void {
    this.empresa = {
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      atividadeEconomica: '',
      endereco: '',
      telefone: ''
    };
  }
}
