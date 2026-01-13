import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaCadastroModalComponent } from '../modals/empresa-cadastro-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EmpresaDialogService {

  constructor(private dialog: MatDialog) {}

  abrirCadastro() {
    return this.dialog.open(EmpresaCadastroModalComponent, {
      width: '700px',
      disableClose: true
    });
  }
}
