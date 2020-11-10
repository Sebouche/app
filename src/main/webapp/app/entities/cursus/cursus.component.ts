import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICursus } from 'app/shared/model/cursus.model';
import { CursusService } from './cursus.service';
import { CursusDeleteDialogComponent } from './cursus-delete-dialog.component';

@Component({
  selector: 'jhi-cursus',
  templateUrl: './cursus.component.html',
})
export class CursusComponent implements OnInit, OnDestroy {
  cursuses?: ICursus[];
  eventSubscriber?: Subscription;

  constructor(protected cursusService: CursusService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cursusService.query().subscribe((res: HttpResponse<ICursus[]>) => (this.cursuses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCursuses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICursus): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCursuses(): void {
    this.eventSubscriber = this.eventManager.subscribe('cursusListModification', () => this.loadAll());
  }

  delete(cursus: ICursus): void {
    const modalRef = this.modalService.open(CursusDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cursus = cursus;
  }
}
