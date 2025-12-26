import { Component, signal } from '@angular/core';// Importa o decorator Component e a função signal do Angular core
import { HeaderComponent } from './components/header/header.component';// Importa o componente de cabeçalho
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';// Importa o componente que lista empresas
import { CommonModule } from '@angular/common';// Importa funcionalidades comuns do Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';// Importa suporte a formulários (ngModel, forms template-driven)
import { FooterComponent} from './components/footer/footer.component';// Importa o componente de rodapé
// Define que esta classe é um componente Angular
@Component({
  // Nome da tag HTML que representa este componente
  selector: 'app-root',

  // Indica que este componente é standalone (não usa NgModule)
  standalone: true,

  // Lista de módulos e componentes que este componente pode usar
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    EmpresaListComponent,
    FooterComponent
],

  // Template HTML inline que será renderizado pelo componente
  template: `
    <app-header></app-header>
    <app-empresa-list></app-empresa-list>
    <app-footer></app-footer>
  `,

  // Arquivo de estilos CSS associado a este componente
  styleUrls: ['./app.css']
})
// Classe principal do componente App
export class App {

  // Cria um signal protegido com o valor inicial 'Empresas'
  // Signals são usados para reatividade no Angular
  protected readonly title = signal('Empresas');
}
