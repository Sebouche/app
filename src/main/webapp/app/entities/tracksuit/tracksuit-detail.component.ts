import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITracksuit } from 'app/shared/model/tracksuit.model';

@Component({
  selector: 'jhi-tracksuit-detail',
  templateUrl: './tracksuit-detail.component.html',
})
export class TracksuitDetailComponent implements OnInit {
  tracksuit: ITracksuit | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tracksuit }) => (this.tracksuit = tracksuit));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
