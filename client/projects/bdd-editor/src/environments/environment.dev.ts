// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  urlUS: 'http://localhost:3000/us',
  urlPersonas: 'http://localhost:3000/persona',
  urlStepVars: 'http://localhost:3000/step-var',
  urlProjects: 'http://localhost:3000/project',
  urlGenerateFeatures: 'http://localhost:3000/generate/features',
  urlGenerateJSON: 'http://localhost:3000/generate/json'
};
