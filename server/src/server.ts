import * as express from 'express';
import * as mongoose from 'mongoose';
import {UsController} from './controller/us.controller';
import {PersonaController} from './controller/persona.controller';
import {TestController} from './controller/test.controller';
import {StepVarController} from './controller/step-var.controller';
import {GenerateController} from './controller/generate.controller';
import {ProjectController} from './controller/project.controller';
import bodyParser = require('body-parser');

class Server {
  app: express.Application;

  constructor(private port: number, private mongoUri: string) {}

  start() {
    mongoose.connect(this.mongoUri, err => {
      if (err) {
        console.log(`Error connecting to the Mongo BDD: ${err}`);
        return;
      }
      console.log(`Connected to Mongo BDD at: ${this.mongoUri}`);

      this.app = express();
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(bodyParser.json());

      this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', '*');
        next();
      });

      this.app.use('/us', UsController);
      this.app.use('/persona', PersonaController);
      this.app.use('/step-var', StepVarController);
      this.app.use('/generate', GenerateController);
      this.app.use('/project', ProjectController);
      this.app.use('/test', TestController);

      this.app.listen(this.port, () => {
        console.log(`Listening at port ${this.port}...`);
      });
    });
  }
}

const uri = 'mongodb://127.0.0.1:27017/bdd';
const nodePort = Number(process.env.PORT) || 3000;
new Server(nodePort, uri).start();
