import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { EcomTestModule } from '../../../test.module';
import { StudentActivityDetailComponent } from 'app/entities/student-activity/student-activity-detail.component';
import { StudentActivity } from 'app/shared/model/student-activity.model';

describe('Component Tests', () => {
  describe('StudentActivity Management Detail Component', () => {
    let comp: StudentActivityDetailComponent;
    let fixture: ComponentFixture<StudentActivityDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ studentActivity: new StudentActivity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EcomTestModule],
        declarations: [StudentActivityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(StudentActivityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StudentActivityDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load studentActivity on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.studentActivity).toEqual(jasmine.objectContaining({ id: 123 }));
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
