import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EcomTestModule } from '../../../test.module';
import { TracksuitDetailComponent } from 'app/entities/tracksuit/tracksuit-detail.component';
import { Tracksuit } from 'app/shared/model/tracksuit.model';

describe('Component Tests', () => {
  describe('Tracksuit Management Detail Component', () => {
    let comp: TracksuitDetailComponent;
    let fixture: ComponentFixture<TracksuitDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ tracksuit: new Tracksuit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [TracksuitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TracksuitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TracksuitDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load tracksuit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tracksuit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
