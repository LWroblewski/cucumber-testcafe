import {ALL_CATEGORIES, ALL_STEPS, Step, StepCategory, US, USCategory} from '../../../../../../../shared/model/us-step.model';
import {Injectable} from '@angular/core';
import {Persona} from '../../../../../../../shared/model/persona.model';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StepVar} from '../../../../../../../shared/model/step-vars.model';
import {Project} from '../../../../../../../shared/model/project.model';
import {map, shareReplay} from 'rxjs/internal/operators';

@Injectable()
export class BDDService {

  stepVars$: Observable<StepVar[]>;

  constructor(private httpClient: HttpClient) {
    this.stepVars$ = this.httpClient.get<StepVar[]>(environment.urlStepVars).pipe(
      shareReplay()
    );
  }

  getSteps(): Observable<Step[]> {
    return of(ALL_STEPS);
  }

  getStepCategories(): Observable<StepCategory[]> {
    return of(ALL_CATEGORIES);
  }

  getStepVars(): Observable<StepVar[]> {
    return this.stepVars$;
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(environment.urlProjects);
  }

  getProject(projectKey: string): Observable<Project> {
    return this.httpClient.get<Project>(`${environment.urlProjects}/key/${projectKey}`);
  }

  getPersona(filePath: string): Observable<Persona> {
    return this.httpClient.get<Persona>(`${environment.urlPersonas}/${encodeURIComponent(filePath)}`);
  }

  getUS(filePath: string): Observable<US> {
    return this.httpClient.get<US>(`${environment.urlUS}/${encodeURIComponent(filePath)}`);
  }

  getStepVar(stepVarId: string): Observable<StepVar> {
    return this.httpClient.get<StepVar>(`${environment.urlStepVars}/${stepVarId}`);
  }

  getUSCategories(projectKey: string = null): Observable<USCategory[]> {
    const urlUSCategories: string = projectKey ? `${environment.urlUS}/project/${projectKey}` : environment.urlUS;
    return this.httpClient.get<US[]>(urlUSCategories)
      .pipe(
        map(usFiles => usFiles.reduce((result, usFile) => {
          if (usFile.category) {
            let usCategory: USCategory = result.find(data => data.title === usFile.category);
            if (!usCategory) {
              result.push(usCategory = { title: usFile.category, children: [] });
            }
            usCategory.children.push(usFile);
          } else {
            result.push(usFile);
          }
          return result;
        }, []))
      );
  }

  getPersonas(projectKey: string): Observable<File[]> {
    return this.httpClient.get<File[]>(`${environment.urlPersonas}/project/${projectKey}`);
  }

  saveUS(us: US): Observable<void> {
    return this.httpClient.post<void>(environment.urlUS, us);
  }

  savePersona(persona: Persona): Observable<void> {
    return this.httpClient.post<void>(environment.urlPersonas, persona);
  }

  saveStepVar(stepVar: StepVar): Observable<void> {
    return this.httpClient.post<void>(environment.urlStepVars, stepVar);
  }

  saveProject(project: Project): Observable<void> {
    return this.httpClient.post<void>(environment.urlProjects, project);
  }

  deleteUS(idUS: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlUS}/${idUS}`);
  }

  deletePersona(idPersona: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlPersonas}/${idPersona}`);
  }

  deleteStepVar(idStepVar: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlStepVars}/${idStepVar}`);
  }

  deleteProject(idProject: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.urlProjects}/${idProject}`);
  }

  generateFeatureFiles(projectKey: string): Observable<Blob> {
    return this.httpClient.get(`${environment.urlGenerateFeatures}/${projectKey}`, {
      responseType: 'blob'
    });
  }

  generateJSON(projectKey: string): Observable<Blob> {
    return this.httpClient.get(`${environment.urlGenerateJSON}/${projectKey}`, {
      responseType: 'blob'
    });
  }
}
