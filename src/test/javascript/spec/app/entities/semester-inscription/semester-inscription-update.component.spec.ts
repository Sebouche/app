import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EcomTestModule } from '../../../test.module';
import { SemesterInscriptionUpdateComponent } from 'app/entities/semester-inscription/semester-inscription-update.component';
import { SemesterInscriptionService } from 'app/entities/semester-inscription/semester-inscription.service';
import { SemesterInscription } from 'app/shared/model/semester-inscription.model';

describe('Component Tests', () => {
  describe('SemesterInscription Management Update Component', () => {
    let comp: SemesterInscriptionUpdateComponent;
    let fixture: ComponentFixture<SemesterInscriptionUpdateComponent>;
    let service: SemesterInscriptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [SemesterInscriptionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SemesterInscriptionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SemesterInscriptionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SemesterInscriptionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SemesterInscription(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SemesterInscription();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
