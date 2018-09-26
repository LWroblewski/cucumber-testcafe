import {Request, Response, Router} from 'express';
import {ProjectRepository} from '../repository/project.repository';

const router: Router = Router();
const repository: ProjectRepository = new ProjectRepository();

router.get('/', (req: Request, res: Response) => {
  repository.retrieve()
    .subscribe(data => res.json(data));
});

router.get('/key/:key', (req: Request, res: Response) => {
  repository.findOne({ key: req.params.key }).subscribe(data => res.json(data));
});

export const ProjectController: Router = router;
