import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITracksuit } from 'app/shared/model/tracksuit.model';
import { TracksuitService } from './tracksuit.service';

@Component({
  templateUrl: './tracksuit-delete-dialog.component.html',
})
export class TracksuitDeleteDialogComponent {
  tracksuit?: ITracksuit;

  constructor(protected tracksuitService: TracksuitService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tracksuitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tracksuitListModification');
      this.activeModal.close();
    });
  }
}
