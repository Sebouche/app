import { Route } from '@angular/router';

import { HomeInstructorComponent } from './homeInstructor.component';

export const HOME_INSTRUCTOR_ROUTE: Route = {
  path: 'homeInstructor',
  component: HomeInstructorComponent,
  data: {
    authorities: [],
    pageTitle: 'homeInstructor.title',
  },
};
