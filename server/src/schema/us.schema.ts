import * as mongoose from 'mongoose';
import {US} from "../../../shared/model/us-step.model";

export interface UsDocument extends US, mongoose.Document {
  createdAt: Date;
  modifiedAt: Date;
}

const schema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  project: { type: String, required: true },
  link: String,
  description: String,
  createdAt: Date,
  editedAt: Date,
  order: Number,
  category: String,
  steps: [{
    stepKey: String,
    variables: [String],
    after: [String]
  }],
  conditions: [{
    key: String,
    value: String
  }]
});
schema.pre('save', (next) => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  this.editedAt = new Date();
  next();
});

export const UsSchema = mongoose.model<UsDocument>('us', schema, 'us', true);
