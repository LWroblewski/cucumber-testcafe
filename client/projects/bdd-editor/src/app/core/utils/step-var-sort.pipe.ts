import {Pipe, PipeTransform} from '@angular/core';
import {StepVar} from '../../../../../../../shared/model/step-vars.model';

@Pipe({
  name: 'sortStepVar',
  pure: true
})
export class StepVarSortPipe implements PipeTransform {

  constructor() { }

  transform(stepVar: StepVar[]): any {
    return stepVar ? stepVar.sort((stepVarOne, stepVarTwo) => stepVarOne.order > stepVarTwo.order ? 1 : -1) : [];
  }
}
