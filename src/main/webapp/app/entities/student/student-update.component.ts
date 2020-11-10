import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ICursus } from 'app/shared/model/cursus.model';
import { CursusService } from 'app/entities/cursus/cursus.service';

type SelectableEntity = IUser | ICursus;

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html',
})
export class StudentUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  cursuses: ICursus[] = [];

  editForm = this.fb.group({
    id: [],
    sportLevel: [],
    drivingLicence: [null, [Validators.required]],
    meetingPlace: [],
    internalUser: [],
    cursus: [],
  });

  constructor(
    protected studentService: StudentService,
    protected userService: UserService,
    protected cursusService: CursusService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.cursusService.query().subscribe((res: HttpResponse<ICursus[]>) => (this.cursuses = res.body || []));
    });
  }

  updateForm(student: IStudent): void {
    this.editForm.patchValue({
      id: student.id,
      sportLevel: student.sportLevel,
      drivingLicence: student.drivingLicence,
      meetingPlace: student.meetingPlace,
      internalUser: student.internalUser,
      cursus: student.cursus,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id'])!.value,
      sportLevel: this.editForm.get(['sportLevel'])!.value,
      drivingLicence: this.editForm.get(['drivingLicence'])!.value,
      meetingPlace: this.editForm.get(['meetingPlace'])!.value,
      internalUser: this.editForm.get(['internalUser'])!.value,
      cursus: this.editForm.get(['cursus'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
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
