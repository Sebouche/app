import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IStudentActivity, StudentActivity } from 'app/shared/model/student-activity.model';
import { StudentActivityService } from './student-activity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student/student.service';
import { IActivity } from 'app/shared/model/activity.model';
import { ActivityService } from 'app/entities/activity/activity.service';

type SelectableEntity = IStudent | IActivity;

@Component({
  selector: 'jhi-student-activity-update',
  templateUrl: './student-activity-update.component.html',
})
export class StudentActivityUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudent[] = [];
  activities: IActivity[] = [];

  editForm = this.fb.group({
    id: [],
    commentToIntructor: [],
    commentByInstructor: [],
    student: [],
    activity: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected studentActivityService: StudentActivityService,
    protected studentService: StudentService,
    protected activityService: ActivityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentActivity }) => {
      this.updateForm(studentActivity);

      this.studentService.query().subscribe((res: HttpResponse<IStudent[]>) => (this.students = res.body || []));

      this.activityService.query().subscribe((res: HttpResponse<IActivity[]>) => (this.activities = res.body || []));
    });
  }

  updateForm(studentActivity: IStudentActivity): void {
    this.editForm.patchValue({
      id: studentActivity.id,
      commentToIntructor: studentActivity.commentToIntructor,
      commentByInstructor: studentActivity.commentByInstructor,
      student: studentActivity.student,
      activity: studentActivity.activity,
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
    const studentActivity = this.createFromForm();
    if (studentActivity.id !== undefined) {
      this.subscribeToSaveResponse(this.studentActivityService.update(studentActivity));
    } else {
      this.subscribeToSaveResponse(this.studentActivityService.create(studentActivity));
    }
  }

  private createFromForm(): IStudentActivity {
    return {
      ...new StudentActivity(),
      id: this.editForm.get(['id'])!.value,
      commentToIntructor: this.editForm.get(['commentToIntructor'])!.value,
      commentByInstructor: this.editForm.get(['commentByInstructor'])!.value,
      student: this.editForm.get(['student'])!.value,
      activity: this.editForm.get(['activity'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentActivity>>): void {
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
}
