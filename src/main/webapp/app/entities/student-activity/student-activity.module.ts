import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { StudentActivityComponent } from './student-activity.component';
import { StudentActivityDetailComponent } from './student-activity-detail.component';
import { StudentActivityUpdateComponent } from './student-activity-update.component';
import { StudentActivityDeleteDialogComponent } from './student-activity-delete-dialog.component';
import { studentActivityRoute } from './student-activity.route';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild(studentActivityRoute)],
  declarations: [
    StudentActivityComponent,
    StudentActivityDetailComponent,
    StudentActivityUpdateComponent,
    StudentActivityDeleteDialogComponent,
  ],
  entryComponents: [StudentActivityDeleteDialogComponent],
})
export class EcomStudentActivityModule {}
