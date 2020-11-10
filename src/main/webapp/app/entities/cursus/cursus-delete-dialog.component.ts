import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICursus } from 'app/shared/model/cursus.model';
import { CursusService } from './cursus.service';

@Component({
  templateUrl: './cursus-delete-dialog.component.html',
})
export class CursusDeleteDialogComponent {
  cursus?: ICursus;

  constructor(protected cursusService: CursusService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cursusService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cursusListModification');
      this.activeModal.close();
    });
  }
}
