import { IStudent } from 'app/shared/model/student.model';
import { IActivity } from 'app/shared/model/activity.model';

export interface IStudentActivity {
  id?: number;
  commentToIntructor?: any;
  commentByInstructor?: any;
  student?: IStudent;
  activity?: IActivity;
}

export class StudentActivity implements IStudentActivity {
  constructor(
    public id?: number,
    public commentToIntructor?: any,
    public commentByInstructor?: any,
    public student?: IStudent,
    public activity?: IActivity
  ) {}
}
