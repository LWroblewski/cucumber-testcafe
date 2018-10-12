import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step, StepCategory} from '../../../../../../../../shared/model/us-step.model';

@Component({
  selector: 'app-steps-categories',
  templateUrl: './steps-categories.component.html',
  styleUrls: ['./steps-categories.component.scss']
})
export class StepsCategoriesComponent {

  @Input()
  categories: StepCategory[];

  @Output()
  stepSelected: EventEmitter<Step> = new EventEmitter<Step>();

  stepFilter: string;

  constructor() {}

  filterSteps(category: StepCategory): Step[] {
    return this.stepFilter && this.stepFilter.length > 1 ?
      category.steps.filter(step => step.sentence.indexOf(this.stepFilter) > -1) : category.steps;
  }

  selectStep(step: Step) {
    this.stepSelected.emit(step);
  }
}
