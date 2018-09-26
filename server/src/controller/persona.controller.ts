import {Request, Response, Router} from 'express';
import {PersonaRepository} from '../repository/persona.repository';
import {PersonaDocument} from '../schema/persona.schema';

const router: Router = Router();
const repository: PersonaRepository = new PersonaRepository();

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
  repository.findById(req.params.id).subscribe(data => res.json(data));
});

router.post('/', (req: Request, res: Response) => {
  repository.createOrUpdate(<PersonaDocument>req.body)
    .subscribe(data => res.json(data));
});

router.delete('/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  repository.delete(id)
    .subscribe(() => res.json({}));
});

export const PersonaController: Router = router;
