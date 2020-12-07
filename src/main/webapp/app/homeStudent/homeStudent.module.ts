import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { HOME_STUDENT_ROUTE } from './homeStudent.route';
import { HomeStudentComponent } from './homeStudent.component';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild([HOME_STUDENT_ROUTE])],
  declarations: [HomeStudentComponent],
})
export class EcomHomeStudentModule {}
