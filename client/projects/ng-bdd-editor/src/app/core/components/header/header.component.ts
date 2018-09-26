import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {of} from 'rxjs';
import {BDDService} from '../../services/bdd.service';
import {saveAs} from 'file-saver';
import {MatDialog} from '@angular/material';
import {ProjectAddComponent} from '../project/project-add/project-add.component';
import {ModalService} from '../modal/modal.service';
import {filter, map, switchMap} from 'rxjs/internal/operators';
import {Project, PROJECT_DEFAULT_VERSION} from '../../../../../../../../shared/model/project.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  currentProject: Project;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bddService: BDDService,
              private changeDetector: ChangeDetectorRef,
              private modal: ModalService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(() => (this.route.firstChild && this.route.firstChild.params) || of({})),
        map(params => params ? params['projectKey'] : ''),
        switchMap(projectKey => projectKey ? this.bddService.getProject(projectKey) : of(null))
      )
      .subscribe(project => {
        this.currentProject = project;
        this.changeDetector.markForCheck();
      });
  }

  getProjectVersion(): string {
    return this.currentProject.version || PROJECT_DEFAULT_VERSION;
  }

  generateFiles() {
    this.bddService.generateFeatureFiles(this.currentProject.key)
      .subscribe(blob => saveAs(blob, `tests-${this.currentProject.key}.zip`));
  }

  generateJSON() {
    this.bddService.generateJSON(this.currentProject.key)
      .subscribe(blob => saveAs(blob, `data-${this.currentProject.key}.json`));
  }

  addProject() {
    this.dialog.open(ProjectAddComponent)
      .afterClosed()
      .pipe(
        filter(result => result !== undefined),
        switchMap(project => this.bddService.saveProject(project))
      )
      .subscribe(() => this.onProjectAdded());
  }

  private onProjectAdded() {
    this.modal.success({ message: 'Le projet a été ajouté.' });
  }
}
