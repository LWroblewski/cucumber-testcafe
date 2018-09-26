export interface Project {
  key: string;
  label: string;
  version?: string;
}

export const PROJECT_DEFAULT_VERSION = '1.0.0';

export const newProject = (label: string) => <Project>({
  label,
  key: label.toLowerCase().replace(new RegExp(' ', 'g'), '-'),
  version: PROJECT_DEFAULT_VERSION
});
