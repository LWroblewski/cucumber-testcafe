import {Request, Response, Router} from 'express';
import {ProjectRepository} from '../repository/project.repository';
import { ProjectDocument } from '../schema/project.schema';

const router: Router = Router();
const repository: ProjectRepository = new ProjectRepository();

router.get('/', (req: Request, res: Response) => {
  repository.retrieve()
    .subscribe(data => res.json(data));
});

router.get('/key/:key', (req: Request, res: Response) => {
  repository.findOne({ key: req.params.key }).subscribe(data => res.json(data));
});

router.post('/', (req: Request, res: Response) => {
  repository.createOrUpdate(<ProjectDocument>req.body)
    .subscribe(data => res.json(data));
});

router.delete('/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  repository.delete(id)
    .subscribe(() => res.json({}));
});

export const ProjectController: Router = router;
