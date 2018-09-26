import * as mongoose from 'mongoose';
import {Persona} from '../../../shared/model/persona.model';

export interface PersonaDocument extends Persona, mongoose.Document {
  createdAt: Date;
  modifiedAt: Date;
}

const schema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  link: String,
  project: { type: String, required: true },
  createdAt: Date,
  data: [{
    key: String,
    value: String
  }]
});
export const PersonaSchema = mongoose.model<PersonaDocument>('persona', schema, 'persona', true);
