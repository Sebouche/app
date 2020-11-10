import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISail } from 'app/shared/model/sail.model';
import { SailService } from './sail.service';

@Component({
  templateUrl: './sail-delete-dialog.component.html',
})
export class SailDeleteDialogComponent {
  sail?: ISail;

  constructor(protected sailService: SailService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sailService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sailListModification');
      this.activeModal.close();
    });
  }
}
