import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PROJECT_DEFAULT_VERSION} from '../../../../../../../../../shared/model/project.model';

@Component({
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddComponent implements OnInit {

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectVersion: new FormControl(PROJECT_DEFAULT_VERSION, Validators.required),
    });
  }

  validateNewProject() {}
}
