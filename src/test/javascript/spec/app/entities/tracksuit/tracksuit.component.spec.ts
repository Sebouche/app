import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcomTestModule } from '../../../test.module';
import { TracksuitComponent } from 'app/entities/tracksuit/tracksuit.component';
import { TracksuitService } from 'app/entities/tracksuit/tracksuit.service';
import { Tracksuit } from 'app/shared/model/tracksuit.model';

describe('Component Tests', () => {
  describe('Tracksuit Management Component', () => {
    let comp: TracksuitComponent;
    let fixture: ComponentFixture<TracksuitComponent>;
    let service: TracksuitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [TracksuitComponent],
      })
        .overrideTemplate(TracksuitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TracksuitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TracksuitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tracksuit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tracksuits && comp.tracksuits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
