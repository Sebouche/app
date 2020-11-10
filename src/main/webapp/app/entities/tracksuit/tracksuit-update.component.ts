import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ITracksuit, Tracksuit } from 'app/shared/model/tracksuit.model';
import { TracksuitService } from './tracksuit.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-tracksuit-update',
  templateUrl: './tracksuit-update.component.html',
})
export class TracksuitUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tracksuitId: [null, [Validators.required]],
    name: [null, [Validators.required]],
    sizeMin: [null, [Validators.required, Validators.min(0)]],
    sizeMax: [null, [Validators.required, Validators.min(0)]],
    weightMin: [null, [Validators.required, Validators.min(0)]],
    weightMax: [null, [Validators.required, Validators.min(0)]],
    comment: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected tracksuitService: TracksuitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tracksuit }) => {
      this.updateForm(tracksuit);
    });
  }

  updateForm(tracksuit: ITracksuit): void {
    this.editForm.patchValue({
      id: tracksuit.id,
      tracksuitId: tracksuit.tracksuitId,
      name: tracksuit.name,
      sizeMin: tracksuit.sizeMin,
      sizeMax: tracksuit.sizeMax,
      weightMin: tracksuit.weightMin,
      weightMax: tracksuit.weightMax,
      comment: tracksuit.comment,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('ecomApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tracksuit = this.createFromForm();
    if (tracksuit.id !== undefined) {
      this.subscribeToSaveResponse(this.tracksuitService.update(tracksuit));
    } else {
      this.subscribeToSaveResponse(this.tracksuitService.create(tracksuit));
    }
  }

  private createFromForm(): ITracksuit {
    return {
      ...new Tracksuit(),
      id: this.editForm.get(['id'])!.value,
      tracksuitId: this.editForm.get(['tracksuitId'])!.value,
      name: this.editForm.get(['name'])!.value,
      sizeMin: this.editForm.get(['sizeMin'])!.value,
      sizeMax: this.editForm.get(['sizeMax'])!.value,
      weightMin: this.editForm.get(['weightMin'])!.value,
      weightMax: this.editForm.get(['weightMax'])!.value,
      comment: this.editForm.get(['comment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITracksuit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
