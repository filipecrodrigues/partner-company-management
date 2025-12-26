import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresa-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa-modal.component.html',
  styleUrls: ['./empresa-modal.component.css']
})
export class EmpresaModalComponent {
  @Input() empresa!: Empresa;
  @Output() fechar = new EventEmitter<void>();
  @Output() salvo = new EventEmitter<void>();

  constructor(private empresaService: EmpresaService) {}

  salvar() {
    if (this.empresa.id) {
      this.empresaService.atualizar(this.empresa.id, this.empresa).subscribe(() => this.finalizar());
    } else {
      this.empresaService.salvar(this.empresa).subscribe(() => this.finalizar());
    }
  }

  finalizar() {
    this.salvo.emit();
    this.fechar.emit();
  }
}
