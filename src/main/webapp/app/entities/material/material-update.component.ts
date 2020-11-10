import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMaterial, Material } from 'app/shared/model/material.model';
import { MaterialService } from './material.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student/student.service';
import { IBoard } from 'app/shared/model/board.model';
import { BoardService } from 'app/entities/board/board.service';
import { ISail } from 'app/shared/model/sail.model';
import { SailService } from 'app/entities/sail/sail.service';
import { ITracksuit } from 'app/shared/model/tracksuit.model';
import { TracksuitService } from 'app/entities/tracksuit/tracksuit.service';

type SelectableEntity = IStudent | IBoard | ISail | ITracksuit;

@Component({
  selector: 'jhi-material-update',
  templateUrl: './material-update.component.html',
})
export class MaterialUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudent[] = [];
  boards: IBoard[] = [];
  sails: ISail[] = [];
  tracksuits: ITracksuit[] = [];

  editForm = this.fb.group({
    id: [],
    students: [],
    board: [],
    sail: [],
    tracksuit: [],
  });

  constructor(
    protected materialService: MaterialService,
    protected studentService: StudentService,
    protected boardService: BoardService,
    protected sailService: SailService,
    protected tracksuitService: TracksuitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ material }) => {
      this.updateForm(material);

      this.studentService.query().subscribe((res: HttpResponse<IStudent[]>) => (this.students = res.body || []));

      this.boardService.query().subscribe((res: HttpResponse<IBoard[]>) => (this.boards = res.body || []));

      this.sailService.query().subscribe((res: HttpResponse<ISail[]>) => (this.sails = res.body || []));

      this.tracksuitService.query().subscribe((res: HttpResponse<ITracksuit[]>) => (this.tracksuits = res.body || []));
    });
  }

  updateForm(material: IMaterial): void {
    this.editForm.patchValue({
      id: material.id,
      students: material.students,
      board: material.board,
      sail: material.sail,
      tracksuit: material.tracksuit,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const material = this.createFromForm();
    if (material.id !== undefined) {
      this.subscribeToSaveResponse(this.materialService.update(material));
    } else {
      this.subscribeToSaveResponse(this.materialService.create(material));
    }
  }

  private createFromForm(): IMaterial {
    return {
      ...new Material(),
      id: this.editForm.get(['id'])!.value,
      students: this.editForm.get(['students'])!.value,
      board: this.editForm.get(['board'])!.value,
      sail: this.editForm.get(['sail'])!.value,
      tracksuit: this.editForm.get(['tracksuit'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterial>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IStudent[], option: IStudent): IStudent {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
