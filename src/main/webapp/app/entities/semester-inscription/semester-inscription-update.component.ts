import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISemesterInscription, SemesterInscription } from 'app/shared/model/semester-inscription.model';
import { SemesterInscriptionService } from './semester-inscription.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student/student.service';
import { ISemester } from 'app/shared/model/semester.model';
import { SemesterService } from 'app/entities/semester/semester.service';

type SelectableEntity = IStudent | ISemester;

@Component({
  selector: 'jhi-semester-inscription-update',
  templateUrl: './semester-inscription-update.component.html',
})
export class SemesterInscriptionUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudent[] = [];
  semesters: ISemester[] = [];

  editForm = this.fb.group({
    id: [],
    noted: [null, [Validators.required]],
    noteMax: [],
    noteGiven: [],
    paid: [null, [Validators.required]],
    student: [],
    semester: [],
  });

  constructor(
    protected semesterInscriptionService: SemesterInscriptionService,
    protected studentService: StudentService,
    protected semesterService: SemesterService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ semesterInscription }) => {
      this.updateForm(semesterInscription);

      this.studentService.query().subscribe((res: HttpResponse<IStudent[]>) => (this.students = res.body || []));

      this.semesterService.query().subscribe((res: HttpResponse<ISemester[]>) => (this.semesters = res.body || []));
    });
  }

  updateForm(semesterInscription: ISemesterInscription): void {
    this.editForm.patchValue({
      id: semesterInscription.id,
      noted: semesterInscription.noted,
      noteMax: semesterInscription.noteMax,
      noteGiven: semesterInscription.noteGiven,
      paid: semesterInscription.paid,
      student: semesterInscription.student,
      semester: semesterInscription.semester,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const semesterInscription = this.createFromForm();
    if (semesterInscription.id !== undefined) {
      this.subscribeToSaveResponse(this.semesterInscriptionService.update(semesterInscription));
    } else {
      this.subscribeToSaveResponse(this.semesterInscriptionService.create(semesterInscription));
    }
  }

  private createFromForm(): ISemesterInscription {
    return {
      ...new SemesterInscription(),
      id: this.editForm.get(['id'])!.value,
      noted: this.editForm.get(['noted'])!.value,
      noteMax: this.editForm.get(['noteMax'])!.value,
      noteGiven: this.editForm.get(['noteGiven'])!.value,
      paid: this.editForm.get(['paid'])!.value,
      student: this.editForm.get(['student'])!.value,
      semester: this.editForm.get(['semester'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISemesterInscription>>): void {
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
