import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { SemesterInscriptionComponent } from './semester-inscription.component';
import { SemesterInscriptionDetailComponent } from './semester-inscription-detail.component';
import { SemesterInscriptionUpdateComponent } from './semester-inscription-update.component';
import { SemesterInscriptionDeleteDialogComponent } from './semester-inscription-delete-dialog.component';
import { semesterInscriptionRoute } from './semester-inscription.route';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild(semesterInscriptionRoute)],
  declarations: [
    SemesterInscriptionComponent,
    SemesterInscriptionDetailComponent,
    SemesterInscriptionUpdateComponent,
    SemesterInscriptionDeleteDialogComponent,
  ],
  entryComponents: [SemesterInscriptionDeleteDialogComponent],
})
export class EcomSemesterInscriptionModule {}
