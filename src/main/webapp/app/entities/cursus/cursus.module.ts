import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { CursusComponent } from './cursus.component';
import { CursusDetailComponent } from './cursus-detail.component';
import { CursusUpdateComponent } from './cursus-update.component';
import { CursusDeleteDialogComponent } from './cursus-delete-dialog.component';
import { cursusRoute } from './cursus.route';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild(cursusRoute)],
  declarations: [CursusComponent, CursusDetailComponent, CursusUpdateComponent, CursusDeleteDialogComponent],
  entryComponents: [CursusDeleteDialogComponent],
})
export class EcomCursusModule {}
