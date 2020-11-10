import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISemesterInscription } from 'app/shared/model/semester-inscription.model';
import { SemesterInscriptionService } from './semester-inscription.service';

@Component({
  templateUrl: './semester-inscription-delete-dialog.component.html',
})
export class SemesterInscriptionDeleteDialogComponent {
  semesterInscription?: ISemesterInscription;

  constructor(
    protected semesterInscriptionService: SemesterInscriptionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.semesterInscriptionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('semesterInscriptionListModification');
      this.activeModal.close();
    });
  }
}
