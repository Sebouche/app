import { IMaterial } from 'app/shared/model/material.model';

export interface ITracksuit {
  id?: number;
  tracksuitId?: number;
  name?: string;
  sizeMin?: number;
  sizeMax?: number;
  weightMin?: number;
  weightMax?: number;
  comment?: any;
  materials?: IMaterial[];
}

export class Tracksuit implements ITracksuit {
  constructor(
    public id?: number,
    public tracksuitId?: number,
    public name?: string,
    public sizeMin?: number,
    public sizeMax?: number,
    public weightMin?: number,
    public weightMax?: number,
    public comment?: any,
    public materials?: IMaterial[]
  ) {}
}
