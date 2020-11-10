import { IStudent } from 'app/shared/model/student.model';
import { ISemester } from 'app/shared/model/semester.model';

export interface ISemesterInscription {
  id?: number;
  noted?: boolean;
  noteMax?: number;
  noteGiven?: number;
  paid?: boolean;
  student?: IStudent;
  semester?: ISemester;
}

export class SemesterInscription implements ISemesterInscription {
  constructor(
    public id?: number,
    public noted?: boolean,
    public noteMax?: number,
    public noteGiven?: number,
    public paid?: boolean,
    public student?: IStudent,
    public semester?: ISemester
  ) {
    this.noted = this.noted || false;
    this.paid = this.paid || false;
  }
}
