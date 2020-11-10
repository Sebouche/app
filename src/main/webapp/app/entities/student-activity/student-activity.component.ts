import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStudentActivity } from 'app/shared/model/student-activity.model';
import { StudentActivityService } from './student-activity.service';
import { StudentActivityDeleteDialogComponent } from './student-activity-delete-dialog.component';

@Component({
  selector: 'jhi-student-activity',
  templateUrl: './student-activity.component.html',
})
export class StudentActivityComponent implements OnInit, OnDestroy {
  studentActivities?: IStudentActivity[];
  eventSubscriber?: Subscription;

  constructor(
    protected studentActivityService: StudentActivityService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.studentActivityService.query().subscribe((res: HttpResponse<IStudentActivity[]>) => (this.studentActivities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStudentActivities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStudentActivity): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInStudentActivities(): void {
    this.eventSubscriber = this.eventManager.subscribe('studentActivityListModification', () => this.loadAll());
  }

  delete(studentActivity: IStudentActivity): void {
    const modalRef = this.modalService.open(StudentActivityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.studentActivity = studentActivity;
  }
}
