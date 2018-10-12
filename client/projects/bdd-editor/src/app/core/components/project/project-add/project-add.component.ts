import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PROJECT_DEFAULT_VERSION, newProject} from '../../../../../../../../../shared/model/project.model';
import { BDDService } from '../../../services/bdd.service';
import { ModalService } from '../../modal/modal.service';

@Component({
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectAddComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private bddService: BDDService, private modal: ModalService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      label: new FormControl('', Validators.required),
      version: new FormControl(PROJECT_DEFAULT_VERSION, Validators.required),
    });
  }

  validateNewProject() {
    this.bddService
    .saveProject(newProject(this.formGroup.get('label').value))
    .subscribe(() => {
      this.modal.success({ message: `Le projet a été sauvegardé.` });
    });;
  }
}
