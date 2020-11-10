import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITracksuit } from 'app/shared/model/tracksuit.model';
import { TracksuitService } from './tracksuit.service';
import { TracksuitDeleteDialogComponent } from './tracksuit-delete-dialog.component';

@Component({
  selector: 'jhi-tracksuit',
  templateUrl: './tracksuit.component.html',
})
export class TracksuitComponent implements OnInit, OnDestroy {
  tracksuits?: ITracksuit[];
  eventSubscriber?: Subscription;

  constructor(
    protected tracksuitService: TracksuitService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tracksuitService.query().subscribe((res: HttpResponse<ITracksuit[]>) => (this.tracksuits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTracksuits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITracksuit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInTracksuits(): void {
    this.eventSubscriber = this.eventManager.subscribe('tracksuitListModification', () => this.loadAll());
  }

  delete(tracksuit: ITracksuit): void {
    const modalRef = this.modalService.open(TracksuitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tracksuit = tracksuit;
  }
}
