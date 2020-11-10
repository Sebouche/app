import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISail } from 'app/shared/model/sail.model';
import { SailService } from './sail.service';
import { SailDeleteDialogComponent } from './sail-delete-dialog.component';

@Component({
  selector: 'jhi-sail',
  templateUrl: './sail.component.html',
})
export class SailComponent implements OnInit, OnDestroy {
  sails?: ISail[];
  eventSubscriber?: Subscription;

  constructor(
    protected sailService: SailService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.sailService.query().subscribe((res: HttpResponse<ISail[]>) => (this.sails = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISail): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSails(): void {
    this.eventSubscriber = this.eventManager.subscribe('sailListModification', () => this.loadAll());
  }

  delete(sail: ISail): void {
    const modalRef = this.modalService.open(SailDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sail = sail;
  }
}
