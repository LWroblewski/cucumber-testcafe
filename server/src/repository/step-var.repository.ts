import {RepositoryBase} from './base.repository';
import {StepVarDocument, StepVarSchema} from '../schema/step-var.schema';

export class StepVarRepository extends RepositoryBase<StepVarDocument> {
  constructor() {
    super(StepVarSchema);
  }
}
