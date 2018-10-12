import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Step} from '../../../../../../../../shared/model/us-step.model';

@Component({
  selector: 'app-steps-list',
  templateUrl: './steps-list.component.html',
  styleUrls: ['./steps-list.component.scss']
})
export class StepsListComponent implements OnInit {

  @Input()
  steps: Step[];

  @Output()
  stepSelected: EventEmitter<Step> = new EventEmitter<Step>();

  constructor() {}

  ngOnInit() {}

  selectStep(step: Step) {
    this.stepSelected.emit(step);
  }
}
