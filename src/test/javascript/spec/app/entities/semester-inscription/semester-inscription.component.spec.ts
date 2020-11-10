import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcomTestModule } from '../../../test.module';
import { SemesterInscriptionComponent } from 'app/entities/semester-inscription/semester-inscription.component';
import { SemesterInscriptionService } from 'app/entities/semester-inscription/semester-inscription.service';
import { SemesterInscription } from 'app/shared/model/semester-inscription.model';

describe('Component Tests', () => {
  describe('SemesterInscription Management Component', () => {
    let comp: SemesterInscriptionComponent;
    let fixture: ComponentFixture<SemesterInscriptionComponent>;
    let service: SemesterInscriptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [SemesterInscriptionComponent],
      })
        .overrideTemplate(SemesterInscriptionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SemesterInscriptionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SemesterInscriptionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SemesterInscription(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.semesterInscriptions && comp.semesterInscriptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
