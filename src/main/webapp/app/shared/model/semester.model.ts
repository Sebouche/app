import { Moment } from 'moment';
import { ISemesterInscription } from 'app/shared/model/semester-inscription.model';

export interface ISemester {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  semesterInscriptions?: ISemesterInscription[];
}

export class Semester implements ISemester {
  constructor(
    public id?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public semesterInscriptions?: ISemesterInscription[]
  ) {}
}
