import { Router, Request, Response } from 'express';
import {UsRepository} from '../repository/us.repository';
import {UsDocument} from '../schema/us.schema';

const router: Router = Router();
const repository: UsRepository = new UsRepository();

router.get('/', (req: Request, res: Response) => {
  repository.retrieve()
    .subscribe(data => res.json(data));
});

router.get('/project/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  repository.find({ project: id })
    .subscribe(data => res.json(data));
});

router.get('/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  repository.findById(id)
    .subscribe(data => res.json(data));
});

router.post('/', (req: Request, res: Response) => {
  repository.createOrUpdate(<UsDocument>req.body)
    .subscribe(data => res.json(data));
});

router.delete('/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  repository.delete(id)
    .subscribe(() => res.json({}));
});

export const UsController: Router = router;
