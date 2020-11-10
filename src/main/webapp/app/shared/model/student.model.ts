import { IUser } from 'app/core/user/user.model';
import { ISemesterInscription } from 'app/shared/model/semester-inscription.model';
import { IStudentActivity } from 'app/shared/model/student-activity.model';
import { ICursus } from 'app/shared/model/cursus.model';
import { IMaterial } from 'app/shared/model/material.model';
import { SportLevel } from 'app/shared/model/enumerations/sport-level.model';
import { MeetingPlace } from 'app/shared/model/enumerations/meeting-place.model';

export interface IStudent {
  id?: number;
  sportLevel?: SportLevel;
  drivingLicence?: boolean;
  meetingPlace?: MeetingPlace;
  internalUser?: IUser;
  semesterInscriptions?: ISemesterInscription[];
  studentActivities?: IStudentActivity[];
  cursus?: ICursus;
  materials?: IMaterial[];
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public sportLevel?: SportLevel,
    public drivingLicence?: boolean,
    public meetingPlace?: MeetingPlace,
    public internalUser?: IUser,
    public semesterInscriptions?: ISemesterInscription[],
    public studentActivities?: IStudentActivity[],
    public cursus?: ICursus,
    public materials?: IMaterial[]
  ) {
    this.drivingLicence = this.drivingLicence || false;
  }
}
