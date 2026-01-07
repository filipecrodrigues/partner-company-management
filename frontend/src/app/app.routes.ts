import { Routes } from '@angular/router';
import { CadastroComponent } from './features/empresas/components/cadastro/cadastro.component';
import { ConsultaComponent } from './features/empresas/components/consulta/consulta.component';


//constante routs do tipo Routes que é um array de rodas para as páginas da aplicação
export const routes: Routes = [
    // rota inicial
    {path: ' ', component: ConsultaComponent}, 
    // opcional
    { path: 'consulta', component: ConsultaComponent },  
    // fallback
    { path: '**', redirectTo: '' }                        
     
];
