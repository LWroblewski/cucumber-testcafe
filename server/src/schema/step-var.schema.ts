import * as mongoose from 'mongoose';
import {StepVar} from '../../../shared/model/step-vars.model';

export interface StepVarDocument extends StepVar, mongoose.Document {
  createdAt: Date;
  modifiedAt: Date;
}

const schema: mongoose.Schema = new mongoose.Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  project: { type: String, required: true },
  description: String,
  order: Number,
  values: [String]
});
export const StepVarSchema = mongoose.model<StepVarDocument>('stepvar', schema, 'stepvar', true);
