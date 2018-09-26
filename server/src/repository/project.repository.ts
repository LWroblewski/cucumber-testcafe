import {RepositoryBase} from './base.repository';
import {ProjectDocument, ProjectSchema} from '../schema/project.schema';

export class ProjectRepository extends RepositoryBase<ProjectDocument> {
  constructor() {
    super(ProjectSchema);
  }
}
