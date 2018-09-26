import * as mongoose from 'mongoose';
import {Project} from '../../../shared/model/project.model';

export interface ProjectDocument extends Project, mongoose.Document {
  createdAt: Date;
  modifiedAt: Date;
}

const schema: mongoose.Schema = new mongoose.Schema({
  key: { type: String, required: true },
  label: { type: String, required: true }
});
export const ProjectSchema = mongoose.model<ProjectDocument>('project', schema, 'project', true);
