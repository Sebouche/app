import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentActivity } from 'app/shared/model/student-activity.model';
import { StudentActivityService } from './student-activity.service';

@Component({
  templateUrl: './student-activity-delete-dialog.component.html',
})
export class StudentActivityDeleteDialogComponent {
  studentActivity?: IStudentActivity;

  constructor(
    protected studentActivityService: StudentActivityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentActivityService.delete(id).subscribe(() => {
      this.eventManager.broadcast('studentActivityListModification');
      this.activeModal.close();
    });
  }
}
