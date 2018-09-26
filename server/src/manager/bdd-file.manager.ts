import {forkJoin} from 'rxjs/observable/forkJoin';
import {FeatureFile} from '../../../shared/model/feature-file.model';
import {FeatureBuilder} from '../../../shared/utils/feature-builder';
import {readdir, readFile, stat, writeFile} from 'fs';
import {zip} from 'rxjs/observable/zip';
import {Observable} from 'rxjs/Observable';
import {BDDConfig} from '../../../shared/model/config.model';
import {Persona} from '../../../shared/model/persona.model';
import {USFileParser} from '../../../shared/utils/us-parser';
import {File} from '../../../shared/model/file.model';
import {of} from 'rxjs/observable/of';
import {combineLatest} from 'rxjs/observable/combineLatest';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

const BDD_CONFIG_FILE_NAME = 'bdd.config.json';
const FILE_ENCODING = 'utf-8';

const US_FILE_EXT = '.us.feature';
const PERSONA_FILE_EXT = '.json';

export class BDDFileManager {

  private config: BDDConfig;

  /**
   * Construction des fichiers feature à partir des fichiers US et Persona.
   */
  build() {
    this.loadFullConfig()
      .map(([us, personas]) => this.buildFeatures(us, personas))
      .flatMap(featureFiles => this.writeFeatureFiles(featureFiles))
      .do(() => console.log('[BDD] Full feature files have been generated'))
      .subscribe();
  }

  /**
   * Chargement de la configuration BDD
   */
  loadConfig(): Observable<BDDConfig> {
    return this.readJSON<BDDConfig>(BDD_CONFIG_FILE_NAME)
      .do(config => this.config = config)
      .do(() => console.log('[BDD] Config has been loaded...'));
  }

  /**
   * Chargement de la configuration BDD et des US/personas existantes
   */
  loadFullConfig(): Observable<[USFileParser[], Persona[]]> {
    return this.loadConfig()
      .switchMap(config => this.onConfigLoaded(config))
      .do(() => console.log('[BDD] US definitions and personas have been loaded...'));
  }

  /**
   * Liste des fichiers US existants
   */
  listUSFiles(config: BDDConfig): Observable<string[]> {
    return this.walk(config.usPath);
  }

  /**
   * Liste des US existantes (avec hierarchie des repertoires)
   */
  listUS(config: BDDConfig): Observable<File[]> {
    return this.listUSFiles(config)
      .map(files => files.map(file => file
        .replace(this.config.usPath, '')
        .replace(US_FILE_EXT, '')))
      .map(files => {
        const usFiles: File[] = [];
        files
          .sort()
          .forEach(file => {
            const indexDirSeparator = file.indexOf('/');
            if (indexDirSeparator > -1) {
              const dirName = file.substr(0, indexDirSeparator);
              const dirFile: File = usFiles.find(usFile => usFile.name === dirName);
              if (dirFile) {
                dirFile.children.push({ name: file.substr(indexDirSeparator + 1) });
              } else {
                usFiles.push({
                  name: dirName,
                  children: [
                    { name: file.substr(indexDirSeparator + 1) }
                  ]
                });
              }
            }
          });
        return usFiles;
      });
  }

  listPersonasFiles(config: BDDConfig): Observable<string[]> {
    return this.readDir(config.personasPath);
  }

  listPersonas(config: BDDConfig): Observable<File[]> {
    return this.listPersonasFiles(config)
      .map(files => files.map(file => file
        .replace(this.config.personasPath, '')
        .replace(PERSONA_FILE_EXT, '')))
      .map(files => files.map(file => ({ name: file })));
  }

  private onConfigLoaded(config: BDDConfig) {
    return zip(
      this.listUSFiles(config),
      this.listPersonasFiles(config)
    )
      .mergeMap(([usFiles, personaFiles]) =>
        zip(
          this.loadUS(usFiles),
          this.loadPersonas(personaFiles)
        )
      );
  }

  private loadUS(usFiles: string[]): Observable<USFileParser[]> {
    return forkJoin(
      usFiles
        .sort()
        .map(fileName => this.loadUSFile(fileName))
    );
  }

  loadUSFile(fileName: string): Observable<USFileParser> {
    return this.readPlainFile(this.formatUSFile(fileName))
      .map(fileContent => new USFileParser({fileName, fileContent}));
  }

  private formatUSFile(fileName: string): string {
    return this.config.usPath + fileName + US_FILE_EXT;
  }

  private loadPersonas(personasFiles: string[]): Observable<Persona[]> {
    return combineLatest(
      personasFiles
        .sort()
        .map(fileName => this.loadPersona(fileName))
    );
  }

  loadPersona(fileName: string): Observable<Persona> {
    return this.readJSON<Persona>(fileName);
  }

  private onConfigError(error: Error) {
    console.error(error);
  }

  private readDir(dirName: string): Observable<string[]> {
    return Observable.create(observer =>
      readdir(dirName, (err, files) => {
        observer.next(err ? err : files.map(fileName => dirName + fileName));
        observer.complete();
      })
    );
  }

  private statFile(filePath: string): Observable<{filePath: string, stats: any}> {
    return Observable.create(observer =>
      stat(filePath, (err, stats) => {
        observer.next({filePath: filePath, stats});
        observer.complete();
      })
    );
  }

  private walk(dirName: string): Observable<string[]> {
    return this.readDir(dirName)
      .flatMap(files => files)
      .flatMap(file => this.statFile(file))
      .flatMap((file: {filePath: string, stats: any}) =>
        file.stats.isDirectory() ?
          this.readDir(file.filePath + '/').mergeAll() : of(file.filePath)
      )
      .toArray();
  }

  private readPlainFile(fileName: string): Observable<string> {
    return Observable.create(observer =>
      readFile(fileName, FILE_ENCODING, (err, data) => {
        observer.next(err ? err : data);
        observer.complete();
      })
    );
  }

  private readJSON<T>(fileName: string): Observable<T> {
    return Observable.create(observer =>
      readFile(fileName, FILE_ENCODING, (err, data) => {
        if (err) {
          observer.next(err);
        } else {
          try {
            observer.next(JSON.parse(data));
          } catch (error) {
            observer.next(error);
          }
        }
        observer.complete();
      })
    );
  }

  private writeAsyncFile(fileName: string, fileContent: string): Observable<void> {
    return Observable.create(observer =>
      writeFile(fileName, fileContent, () => {
        observer.next();
        observer.complete();
      }));
  }

  private buildFeatures(features: USFileParser[], personas: Persona[]): FeatureFile[] {
    return [
      ...personas.map(persona => new FeatureBuilder(features, persona).build())
    ];
  }

  private writeFeatureFiles(featureFiles: FeatureFile[]) {
    return zip(
      ...featureFiles.map(file =>
        this.writeAsyncFile(this.config.featuresPath + file.fileName + '.feature', file.fileContent)
      )
    );
  }
}
