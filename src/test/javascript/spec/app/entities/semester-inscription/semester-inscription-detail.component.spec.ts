import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EcomTestModule } from '../../../test.module';
import { SemesterInscriptionDetailComponent } from 'app/entities/semester-inscription/semester-inscription-detail.component';
import { SemesterInscription } from 'app/shared/model/semester-inscription.model';

describe('Component Tests', () => {
  describe('SemesterInscription Management Detail Component', () => {
    let comp: SemesterInscriptionDetailComponent;
    let fixture: ComponentFixture<SemesterInscriptionDetailComponent>;
    const route = ({ data: of({ semesterInscription: new SemesterInscription(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [SemesterInscriptionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SemesterInscriptionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SemesterInscriptionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load semesterInscription on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.semesterInscription).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
