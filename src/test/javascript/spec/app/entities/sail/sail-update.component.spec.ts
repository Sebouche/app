import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EcomTestModule } from '../../../test.module';
import { SailUpdateComponent } from 'app/entities/sail/sail-update.component';
import { SailService } from 'app/entities/sail/sail.service';
import { Sail } from 'app/shared/model/sail.model';

describe('Component Tests', () => {
  describe('Sail Management Update Component', () => {
    let comp: SailUpdateComponent;
    let fixture: ComponentFixture<SailUpdateComponent>;
    let service: SailService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [SailUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SailUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SailUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SailService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sail(123);
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
        const entity = new Sail();
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
