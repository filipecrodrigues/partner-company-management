import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Empresa } from '../models/empresa.model';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-empresa-cadastro-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './empresa-cadastro-modal.component.html',
  styleUrls: ['./empresa-cadastro-modal.component.scss']
})
export class EmpresaCadastroModalComponent implements OnInit {

  empresa: Empresa = {
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    atividadeEconomica: '',
    endereco: '',
    telefone: ''
  };

  isEdicao = false;

  constructor(
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EmpresaCadastroModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: { empresa?: Empresa }
  ) {}

  ngOnInit(): void {
    if (this.data?.empresa) {
      this.empresa = { ...this.data.empresa };
      this.isEdicao = true;
    }
  }
    salvar(): void {
  const request$ = this.isEdicao && this.empresa.id
    ? this.empresaService.atualizar(this.empresa.id, this.empresa)
    : this.empresaService.criar(this.empresa);

  request$.subscribe({
    next: () => {
      this.snackBar.open(
        this.isEdicao
          ? 'Empresa atualizada com sucesso!'
          : 'Empresa cadastrada com sucesso!',
        'Fechar',
        { duration: 3000 }
      );

      this.dialogRef.close(true);
    },
    error: () => {
      this.snackBar.open(
        'Erro ao salvar empresa. Tente novamente.',
        'Fechar',
        { duration: 4000 }
      );
    }
  });
}

 

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
