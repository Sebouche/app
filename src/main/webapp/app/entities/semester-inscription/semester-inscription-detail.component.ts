import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISemesterInscription } from 'app/shared/model/semester-inscription.model';

@Component({
  selector: 'jhi-semester-inscription-detail',
  templateUrl: './semester-inscription-detail.component.html',
})
export class SemesterInscriptionDetailComponent implements OnInit {
  semesterInscription: ISemesterInscription | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ semesterInscription }) => (this.semesterInscription = semesterInscription));
  }

  previousState(): void {
    window.history.back();
  }
}
