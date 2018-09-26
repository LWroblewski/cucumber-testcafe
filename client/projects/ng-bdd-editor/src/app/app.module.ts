import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BDDService} from './core/services/bdd.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsModule} from './core/components/us/us.module';
import {StepsModule} from './core/components/steps/steps.module';
import {SharedModule} from './core/shared/shared.module';

import './core/shared/rxjs-operators';
import {HeaderComponent} from './core/components/header/header.component';
import {PageUsComponent} from './pages/page-us/page-us.component';
import {PagePersonaComponent} from './pages/page-persona/page-persona.component';
import {ModalModule} from './core/components/modal/modal.module';
import {StepVarModule} from './core/components/step-var/step-var.module';
import {PageProjectsComponent} from './pages/page-projects/page-projects.component';
import {PageProjectComponent} from './pages/page-project/page-project.component';
import {PageStepVarComponent} from './pages/page-step-var/page-step-var.component';
import {PersonasModule} from './core/components/persona/personas.module';
import {ProjectModule} from './core/components/project/project.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageProjectComponent,
    PageUsComponent,
    PagePersonaComponent,
    PageProjectsComponent,
    PageStepVarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ModalModule,
    PersonasModule,
    StepsModule,
    StepVarModule,
    UsModule,
    ProjectModule
  ],
  providers: [
    BDDService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
