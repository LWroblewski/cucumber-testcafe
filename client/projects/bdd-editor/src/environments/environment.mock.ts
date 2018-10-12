// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  urlUS: './assets/mock/us.json',
  urlPersonas: './assets/mock/personas.json',
  urlStepVars: './assets/mock/step-var.json',
  urlProjects: './assets/mock/project.json',
  urlGenerateFeatures: 'http://localhost:3000/features/generate',
  urlGenerateJSON: 'http://localhost:3000/generate/json'
};
