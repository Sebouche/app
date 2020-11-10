import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EcomTestModule } from '../../../test.module';
import { SailComponent } from 'app/entities/sail/sail.component';
import { SailService } from 'app/entities/sail/sail.service';
import { Sail } from 'app/shared/model/sail.model';

describe('Component Tests', () => {
  describe('Sail Management Component', () => {
    let comp: SailComponent;
    let fixture: ComponentFixture<SailComponent>;
    let service: SailService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [SailComponent],
      })
        .overrideTemplate(SailComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SailComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SailService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Sail(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sails && comp.sails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
