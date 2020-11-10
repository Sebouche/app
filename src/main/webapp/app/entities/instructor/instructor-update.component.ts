import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInstructor, Instructor } from 'app/shared/model/instructor.model';
import { InstructorService } from './instructor.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IActivity } from 'app/shared/model/activity.model';
import { ActivityService } from 'app/entities/activity/activity.service';

type SelectableEntity = IUser | IActivity;

@Component({
  selector: 'jhi-instructor-update',
  templateUrl: './instructor-update.component.html',
})
export class InstructorUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  activities: IActivity[] = [];

  editForm = this.fb.group({
    id: [],
    internalUser: [],
    participateActivities: [],
    editableActivities: [],
  });

  constructor(
    protected instructorService: InstructorService,
    protected userService: UserService,
    protected activityService: ActivityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instructor }) => {
      this.updateForm(instructor);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.activityService.query().subscribe((res: HttpResponse<IActivity[]>) => (this.activities = res.body || []));
    });
  }

  updateForm(instructor: IInstructor): void {
    this.editForm.patchValue({
      id: instructor.id,
      internalUser: instructor.internalUser,
      participateActivities: instructor.participateActivities,
      editableActivities: instructor.editableActivities,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const instructor = this.createFromForm();
    if (instructor.id !== undefined) {
      this.subscribeToSaveResponse(this.instructorService.update(instructor));
    } else {
      this.subscribeToSaveResponse(this.instructorService.create(instructor));
    }
  }

  private createFromForm(): IInstructor {
    return {
      ...new Instructor(),
      id: this.editForm.get(['id'])!.value,
      internalUser: this.editForm.get(['internalUser'])!.value,
      participateActivities: this.editForm.get(['participateActivities'])!.value,
      editableActivities: this.editForm.get(['editableActivities'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstructor>>): void {
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

  getSelected(selectedVals: IActivity[], option: IActivity): IActivity {
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
