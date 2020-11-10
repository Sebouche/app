import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISemesterInscription } from 'app/shared/model/semester-inscription.model';
import { SemesterInscriptionService } from './semester-inscription.service';
import { SemesterInscriptionDeleteDialogComponent } from './semester-inscription-delete-dialog.component';

@Component({
  selector: 'jhi-semester-inscription',
  templateUrl: './semester-inscription.component.html',
})
export class SemesterInscriptionComponent implements OnInit, OnDestroy {
  semesterInscriptions?: ISemesterInscription[];
  eventSubscriber?: Subscription;

  constructor(
    protected semesterInscriptionService: SemesterInscriptionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.semesterInscriptionService
      .query()
      .subscribe((res: HttpResponse<ISemesterInscription[]>) => (this.semesterInscriptions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSemesterInscriptions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISemesterInscription): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSemesterInscriptions(): void {
    this.eventSubscriber = this.eventManager.subscribe('semesterInscriptionListModification', () => this.loadAll());
  }

  delete(semesterInscription: ISemesterInscription): void {
    const modalRef = this.modalService.open(SemesterInscriptionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.semesterInscription = semesterInscription;
  }
}
