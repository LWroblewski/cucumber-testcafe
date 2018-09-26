import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagePersonaComponent} from './pages/page-persona/page-persona.component';
import {PageUsComponent} from './pages/page-us/page-us.component';
import {PageProjectsComponent} from './pages/page-projects/page-projects.component';
import {PageProjectComponent} from './pages/page-project/page-project.component';
import {PageStepVarComponent} from "./pages/page-step-var/page-step-var.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {path: 'home', component: PageProjectsComponent},
  {
    path: 'project/:projectKey',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: PageProjectComponent },
      {path: 'us', component: PageUsComponent},
      {path: 'us/:usId', component: PageUsComponent},
      {path: 'persona', component: PagePersonaComponent},
      {path: 'persona/:personaId', component: PagePersonaComponent},
      {path: 'step-var', component: PageStepVarComponent},
      {path: 'step-var/:stepVarId', component: PageStepVarComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      enableTracing: false
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
