import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EcomTestModule } from '../../../test.module';
import { TracksuitUpdateComponent } from 'app/entities/tracksuit/tracksuit-update.component';
import { TracksuitService } from 'app/entities/tracksuit/tracksuit.service';
import { Tracksuit } from 'app/shared/model/tracksuit.model';

describe('Component Tests', () => {
  describe('Tracksuit Management Update Component', () => {
    let comp: TracksuitUpdateComponent;
    let fixture: ComponentFixture<TracksuitUpdateComponent>;
    let service: TracksuitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [TracksuitUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TracksuitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TracksuitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TracksuitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tracksuit(123);
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
        const entity = new Tracksuit();
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
