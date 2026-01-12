import { Routes } from '@angular/router';
import { EmpresasListaComponent } from './features/empresas/pages/empresas-lista/empresas-lista.component';

export const routes: Routes = [
  // rota inicial → já abre Empresas Cadastradas
  { path: '', component: EmpresasListaComponent },

  // (opcional) manter por compatibilidade ou remover depois
  { path: 'consulta', component: EmpresasListaComponent },

  // fallback
  { path: '**', redirectTo: '' }
];
