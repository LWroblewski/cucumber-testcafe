import {UsDocument, UsSchema} from '../schema/us.schema';
import {RepositoryBase} from './base.repository';

export class UsRepository extends RepositoryBase<UsDocument> {
  constructor() {
    super(UsSchema);
  }
}
