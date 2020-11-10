import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISemester } from 'app/shared/model/semester.model';
import { SemesterService } from './semester.service';
import { SemesterDeleteDialogComponent } from './semester-delete-dialog.component';

@Component({
  selector: 'jhi-semester',
  templateUrl: './semester.component.html',
})
export class SemesterComponent implements OnInit, OnDestroy {
  semesters?: ISemester[];
  eventSubscriber?: Subscription;

  constructor(protected semesterService: SemesterService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.semesterService.query().subscribe((res: HttpResponse<ISemester[]>) => (this.semesters = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSemesters();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISemester): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSemesters(): void {
    this.eventSubscriber = this.eventManager.subscribe('semesterListModification', () => this.loadAll());
  }

  delete(semester: ISemester): void {
    const modalRef = this.modalService.open(SemesterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.semester = semester;
  }
}
