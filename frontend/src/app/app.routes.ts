import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { EmpresasListaComponent } from './features/empresas/pages/empresas-lista/empresas-lista.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'consulta',
        pathMatch: 'full'
      },
      {
        path: 'consulta',
        component: EmpresasListaComponent
      }
    ]
  },

  // fallback
  { path: '**', redirectTo: '' }
];
