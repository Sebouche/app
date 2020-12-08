import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { HOME_INSTRUCTOR_ROUTE } from './homeInstructor.route';
import { HomeInstructorComponent } from './homeInstructor.component';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild([HOME_INSTRUCTOR_ROUTE])],
  declarations: [HomeInstructorComponent],
})
export class EcomHomeInstructorModule {}
