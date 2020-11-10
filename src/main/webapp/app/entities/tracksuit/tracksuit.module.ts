import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { TracksuitComponent } from './tracksuit.component';
import { TracksuitDetailComponent } from './tracksuit-detail.component';
import { TracksuitUpdateComponent } from './tracksuit-update.component';
import { TracksuitDeleteDialogComponent } from './tracksuit-delete-dialog.component';
import { tracksuitRoute } from './tracksuit.route';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild(tracksuitRoute)],
  declarations: [TracksuitComponent, TracksuitDetailComponent, TracksuitUpdateComponent, TracksuitDeleteDialogComponent],
  entryComponents: [TracksuitDeleteDialogComponent],
})
export class EcomTracksuitModule {}
