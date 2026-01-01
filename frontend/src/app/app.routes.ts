import { Routes } from '@angular/router';
import { CadastroComponent } from './features/empresas/components/cadastro-modal/cadastro.component';
import { ConsultaComponent } from './features/empresas/components/consulta-modal/consulta.component';


//constante routs do tipo Routes que é um array de rodas para as páginas da aplicação
export const routes: Routes = [
    {path: 'cadastro', component: CadastroComponent}, // rota para a página de cadastro
    {path: 'consulta', component: ConsultaComponent} //rota para a pagina de consulta
];
