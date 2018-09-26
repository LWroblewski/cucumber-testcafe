import {BddConfiguration, defaultBddConfiguration} from './config.model';
import * as fs from 'fs';

const CONFIG_FILE_NAME = 'bdd-config.json';

export function loadConfig(): Promise<BddConfiguration> {
  return new Promise((resolve, reject) => {
    fs.readFile(CONFIG_FILE_NAME, (err, data) => {
      resolve(err ? defaultBddConfiguration : {
        ...defaultBddConfiguration,
        ...JSON.parse(data.toString())
      });
    });
  });
}
