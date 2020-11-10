import { IMaterial } from 'app/shared/model/material.model';
import { SportLevel } from 'app/shared/model/enumerations/sport-level.model';

export interface IBoard {
  id?: number;
  boardId?: string;
  name?: string;
  volume?: number;
  level?: SportLevel;
  usable?: boolean;
  comment?: any;
  materials?: IMaterial[];
}

export class Board implements IBoard {
  constructor(
    public id?: number,
    public boardId?: string,
    public name?: string,
    public volume?: number,
    public level?: SportLevel,
    public usable?: boolean,
    public comment?: any,
    public materials?: IMaterial[]
  ) {
    this.usable = this.usable || false;
  }
}
