import { IStudent } from 'app/shared/model/student.model';
import { IBoard } from 'app/shared/model/board.model';
import { ISail } from 'app/shared/model/sail.model';
import { ITracksuit } from 'app/shared/model/tracksuit.model';

export interface IMaterial {
  id?: number;
  students?: IStudent[];
  board?: IBoard;
  sail?: ISail;
  tracksuit?: ITracksuit;
}

export class Material implements IMaterial {
  constructor(
    public id?: number,
    public students?: IStudent[],
    public board?: IBoard,
    public sail?: ISail,
    public tracksuit?: ITracksuit
  ) {}
}
