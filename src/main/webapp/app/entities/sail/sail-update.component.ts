import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISail, Sail } from 'app/shared/model/sail.model';
import { SailService } from './sail.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-sail-update',
  templateUrl: './sail-update.component.html',
})
export class SailUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sailId: [null, [Validators.required]],
    name: [null, [Validators.required]],
    area: [null, [Validators.required]],
    level: [null, [Validators.required]],
    usable: [null, [Validators.required]],
    comment: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected sailService: SailService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sail }) => {
      this.updateForm(sail);
    });
  }

  updateForm(sail: ISail): void {
    this.editForm.patchValue({
      id: sail.id,
      sailId: sail.sailId,
      name: sail.name,
      area: sail.area,
      level: sail.level,
      usable: sail.usable,
      comment: sail.comment,
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
    const sail = this.createFromForm();
    if (sail.id !== undefined) {
      this.subscribeToSaveResponse(this.sailService.update(sail));
    } else {
      this.subscribeToSaveResponse(this.sailService.create(sail));
    }
  }

  private createFromForm(): ISail {
    return {
      ...new Sail(),
      id: this.editForm.get(['id'])!.value,
      sailId: this.editForm.get(['sailId'])!.value,
      name: this.editForm.get(['name'])!.value,
      area: this.editForm.get(['area'])!.value,
      level: this.editForm.get(['level'])!.value,
      usable: this.editForm.get(['usable'])!.value,
      comment: this.editForm.get(['comment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISail>>): void {
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
