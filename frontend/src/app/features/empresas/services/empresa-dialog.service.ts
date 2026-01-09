import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastroComponent } from '../components/cadastro/cadastro.component';

@Injectable({
  providedIn: 'root'
})
export class EmpresaDialogService {

  constructor(private dialog: MatDialog) {}

  abrirCadastro() {
    return this.dialog.open(CadastroComponent, {
      width: '700px',
      disableClose: true
    });
  }
}
