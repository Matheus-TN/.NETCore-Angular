import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { ProfessoresComponent } from './professores/professores.component';
import { PerfisComponent } from './perfis/perfis.component';
import { DashboardsComponent } from './dashboards/dashboards.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboards', pathMatch: 'full'}, // redirect para dashboard ao iniciar o programa
  { path: 'alunos', component: AlunosComponent },
  { path: 'professores', component: ProfessoresComponent },
  { path: 'perfis', component: PerfisComponent },
  { path: 'dashboards', component: DashboardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
