import {Request, Response, Router} from 'express';
import {UsRepository} from '../repository/us.repository';
import {PersonaRepository} from '../repository/persona.repository';
import {US} from '../../../shared/model/us-step.model';
import {UsDocument} from '../schema/us.schema';
import {Persona} from '../../../shared/model/persona.model';
import {PersonaDocument} from '../schema/persona.schema';
import {StepVar} from '../../../shared/model/step-vars.model';
import {StepVarRepository} from '../repository/step-var.repository';
import {StepVarDocument} from '../schema/step-var.schema';
import {combineLatest} from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import {ProjectRepository} from '../repository/project.repository';
import {ProjectDocument} from '../schema/project.schema';
import {Project} from '../../../shared/model/project.model';

const listStepVars: StepVar[] = require('../../../data/step-var.json');
const listPersona: Persona[] = require('../../../data/persona.json');
const listUS: US[] = require('../../../data/us.json');
const listProjects: Project[] = require('../../../data/project.json');

const router: Router = Router();
const usRepository: UsRepository = new UsRepository();
const personaRepository: PersonaRepository = new PersonaRepository();
const stepVarRepository: StepVarRepository = new StepVarRepository();
const projectRepository: ProjectRepository = new ProjectRepository();

router.get('/', (req: Request, res: Response) => {
  combineLatest(
    stepVarRepository.deleteAll(),
    personaRepository.deleteAll(),
    usRepository.deleteAll(),
    projectRepository.deleteAll()
  ).switchMap(() => combineLatest(
    stepVarRepository.create(<StepVarDocument[]>listStepVars),
    personaRepository.create(<PersonaDocument[]>listPersona),
    usRepository.create(<UsDocument[]>listUS),
    projectRepository.create(<ProjectDocument[]>listProjects)
  )).subscribe(data => res.json(data));
});

router.get('/add-step-var', (req: Request, res: Response) => {
  stepVarRepository.deleteAll()
    .switchMap(() => stepVarRepository.create(<StepVarDocument[]>listStepVars))
    .subscribe(data => res.json(data));
});

router.get('/add-persona', (req: Request, res: Response) => {
  personaRepository.deleteAll()
    .switchMap(() => personaRepository.create(<PersonaDocument[]>listPersona))
    .subscribe(data => res.json(data));
});

router.get('/add-us', (req: Request, res: Response) => {
  usRepository.deleteAll()
    .switchMap(() => usRepository.create(<UsDocument[]>listUS))
    .subscribe(data => res.json(data));
});

router.get('/add-project', (req: Request, res: Response) => {
  projectRepository.deleteAll()
    .switchMap(() => projectRepository.create(<ProjectDocument[]>listProjects))
    .subscribe(data => res.json(data));
});

router.get('/remove-persona', (req: Request, res: Response) => {
  personaRepository.deleteAll()
    .subscribe(data => res.json(data));
});

router.get('/remove-us', (req: Request, res: Response) => {
  usRepository.deleteAll()
    .subscribe(data => res.json(data));
});

router.get('/remove-step-var', (req: Request, res: Response) => {
  stepVarRepository.deleteAll()
    .subscribe(data => res.json(data));
});

export const TestController: Router = router;
