import { Composant } from 'app/shared/model/enumerations/composant.model';

export interface ICursus {
  id?: number;
  composant?: Composant;
  academicLevel?: number;
}

export class Cursus implements ICursus {
  constructor(public id?: number, public composant?: Composant, public academicLevel?: number) {}
}
