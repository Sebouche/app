import { Route } from '@angular/router';

import { HomeStudentComponent } from './homeStudent.component';

export const HOME_STUDENT_ROUTE: Route = {
  path: 'homeStudent',
  component: HomeStudentComponent,
  data: {
    authorities: [],
    pageTitle: 'homeStudent.title',
  },
};
