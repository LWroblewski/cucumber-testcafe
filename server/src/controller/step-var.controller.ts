import {Request, Response, Router} from 'express';
import {StepVarRepository} from '../repository/step-var.repository';
import {StepVarDocument} from '../schema/step-var.schema';

const router: Router = Router();
const repository: StepVarRepository = new StepVarRepository();

router.get('/', (req: Request, res: Response) => {
  repository.retrieve()
    .subscribe(data => res.json(data));
});

router.get('/:id', (req: Request, res: Response) => {
  repository.findById(req.params.id).subscribe(data => res.json(data));
});

router.post('/', (req: Request, res: Response) => {
  repository.createOrUpdate(<StepVarDocument>req.body)
    .subscribe(data => res.json(data));
});

router.delete('/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  repository.delete(id)
    .subscribe(() => res.json({}));
});

export const StepVarController: Router = router;
