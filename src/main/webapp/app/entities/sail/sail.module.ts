import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { SailComponent } from './sail.component';
import { SailDetailComponent } from './sail-detail.component';
import { SailUpdateComponent } from './sail-update.component';
import { SailDeleteDialogComponent } from './sail-delete-dialog.component';
import { sailRoute } from './sail.route';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild(sailRoute)],
  declarations: [SailComponent, SailDetailComponent, SailUpdateComponent, SailDeleteDialogComponent],
  entryComponents: [SailDeleteDialogComponent],
})
export class EcomSailModule {}
