import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project, PROJECT_DEFAULT_VERSION} from '../../../../../../../shared/model/project.model';
import {BDDService} from '../../core/services/bdd.service';
import {ModalService} from '../../core/components/modal/modal.service';
import {filter, switchMap} from 'rxjs/internal/operators';

@Component({
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageProjectsComponent implements OnInit {

  projects$: Observable<Project[]>;

  constructor(private bddService: BDDService,
              private modal: ModalService) {}

  ngOnInit(): void {
    this.projects$ = this.bddService.getProjects();
  }

  getProjectVersion(project: Project): string {
    return project.version || PROJECT_DEFAULT_VERSION;
  }

  duplicateProject(project: Project) {}

  deletProject(project: Project) {
    this.modal.confirm({
      message: `Souhaitez-vous supprimer le projet ${project.label}?`
    })
      .pipe(
        filter(result => !!result),
        switchMap(() => this.bddService.deleteProject(project.key))
      )
      .subscribe(() => this.onProjectDeleted());
  }

  onProjectDeleted() {
    this.modal.success({
      message: 'Le projet a été supprimé.'
    });
    this.projects$ = this.bddService.getProjects();
  }
}
