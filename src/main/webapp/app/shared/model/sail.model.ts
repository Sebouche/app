import { IMaterial } from 'app/shared/model/material.model';
import { SportLevel } from 'app/shared/model/enumerations/sport-level.model';

export interface ISail {
  id?: number;
  sailId?: string;
  name?: string;
  area?: number;
  level?: SportLevel;
  usable?: boolean;
  comment?: any;
  materials?: IMaterial[];
}

export class Sail implements ISail {
  constructor(
    public id?: number,
    public sailId?: string,
    public name?: string,
    public area?: number,
    public level?: SportLevel,
    public usable?: boolean,
    public comment?: any,
    public materials?: IMaterial[]
  ) {
    this.usable = this.usable || false;
  }
}
