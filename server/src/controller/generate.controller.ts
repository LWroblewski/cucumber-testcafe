import {Request, Response, Router} from 'express';
import {PersonaRepository} from '../repository/persona.repository';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {UsRepository} from '../repository/us.repository';
import {US} from '../../../shared/model/us-step.model';
import {FeatureFile} from '../../../shared/model/feature-file.model';
import {FeatureBuilder} from '../../../shared/utils/feature-builder';
import {USFileParser} from '../../../shared/utils/us-parser';
import 'rxjs/add/operator/map';
import {StepVarRepository} from '../repository/step-var.repository';
import {Persona} from '../../../shared/model/persona.model';

const Zip = require('node-zip');

const router: Router = Router();
const usRepository: UsRepository = new UsRepository();
const personaRepository: PersonaRepository = new PersonaRepository();
const stepVarRepository: StepVarRepository = new StepVarRepository();

function buildFeatureFiles(listPersona: Persona[], listUS: US[]): FeatureFile[] {
  const listUsParsers: USFileParser[] = listUS.map(us => USFileParser.fromUS(us));
  return listPersona
    .map(persona => new FeatureBuilder(listUsParsers, persona).build());
}

function generateZipFile(featureFiles: FeatureFile[]) {
  const zip = new Zip();
  const zipOptions = {base64: false, compression: 'DEFLATE'};
  featureFiles.forEach(featureFile =>
    zip.file(`${featureFile.fileName}.feature`, featureFile.fileContent));
  return zip.generate(zipOptions);
}

router.get('/features/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  combineLatest(
    usRepository.find({ project: id }),
    personaRepository.find({ project: id })
  ).map(([us, persona]) => buildFeatureFiles(persona, us))
    .map(featureFiles => generateZipFile(featureFiles))
    .subscribe(zipFileData => {
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', `attachment; filename=features-${id}.zip`);
      res.set('Content-Length', zipFileData.length);
      res.end(zipFileData, 'binary');
      return res;
    });
});

router.get('/json/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  combineLatest(
    stepVarRepository.find({ project: id }),
    usRepository.find({ project: id }),
    personaRepository.find({ project: id })
  )
    .map(([stepVars, us, persona]) => ({stepVars, us, persona}))
    .subscribe(fullData => res.json(fullData));
});

export const GenerateController: Router = router;
