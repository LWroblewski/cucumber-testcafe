export interface PersonaData {
  key: string;
  value: string;
}

export interface Persona {
  name: string;
  description?: string;
  link?: string;
  project?: string;
  data: PersonaData[];
}

export const newPersona = () => <Persona>({ name: null, data: []});
