import {RepositoryBase} from './base.repository';
import {PersonaDocument, PersonaSchema} from '../schema/persona.schema';

export class PersonaRepository extends RepositoryBase<PersonaDocument> {
  constructor() {
    super(PersonaSchema);
  }
}
