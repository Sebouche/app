import { Moment } from 'moment';
import { IStudentActivity } from 'app/shared/model/student-activity.model';
import { IInstructor } from 'app/shared/model/instructor.model';
import { Lakes } from 'app/shared/model/enumerations/lakes.model';

export interface IActivity {
  id?: number;
  name?: string;
  date?: Moment;
  place?: string;
  capacity?: number;
  inscriptionOpen?: boolean;
  coeff?: number;
  lake?: Lakes;
  studentActivities?: IStudentActivity[];
  monitors?: IInstructor[];
  managers?: IInstructor[];
}

export class Activity implements IActivity {
  constructor(
    public id?: number,
    public name?: string,
    public date?: Moment,
    public place?: string,
    public capacity?: number,
    public inscriptionOpen?: boolean,
    public coeff?: number,
    public lake?: Lakes,
    public studentActivities?: IStudentActivity[],
    public monitors?: IInstructor[],
    public managers?: IInstructor[]
  ) {
    this.inscriptionOpen = this.inscriptionOpen || false;
  }
}
