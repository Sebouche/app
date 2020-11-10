import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IStudentActivity } from 'app/shared/model/student-activity.model';

@Component({
  selector: 'jhi-student-activity-detail',
  templateUrl: './student-activity-detail.component.html',
})
export class StudentActivityDetailComponent implements OnInit {
  studentActivity: IStudentActivity | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentActivity }) => (this.studentActivity = studentActivity));
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
