import { IUser } from 'app/core/user/user.model';
import { IActivity } from 'app/shared/model/activity.model';

export interface IInstructor {
  id?: number;
  internalUser?: IUser;
  participateActivities?: IActivity[];
  editableActivities?: IActivity[];
}

export class Instructor implements IInstructor {
  constructor(
    public id?: number,
    public internalUser?: IUser,
    public participateActivities?: IActivity[],
    public editableActivities?: IActivity[]
  ) {}
}
