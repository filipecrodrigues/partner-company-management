import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-empresa-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './empresa-card.component.html',
  styleUrls: ['./empresa-card.component.scss'],
})
export class EmpresaCardComponent {
  @Input() empresa!: Empresa;

  @Output() editar = new EventEmitter<Empresa>();
  @Output() deletar = new EventEmitter<number>();

  onEditar(): void {
    this.editar.emit(this.empresa);
  }

  onDeletar(): void {
    this.deletar.emit(this.empresa.id!);
  }
}
