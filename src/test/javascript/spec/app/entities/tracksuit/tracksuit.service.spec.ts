import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TracksuitService } from 'app/entities/tracksuit/tracksuit.service';
import { ITracksuit, Tracksuit } from 'app/shared/model/tracksuit.model';

describe('Service Tests', () => {
  describe('Tracksuit Service', () => {
    let injector: TestBed;
    let service: TracksuitService;
    let httpMock: HttpTestingController;
    let elemDefault: ITracksuit;
    let expectedResult: ITracksuit | ITracksuit[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TracksuitService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Tracksuit(0, 0, 'AAAAAAA', 0, 0, 0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Tracksuit', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Tracksuit()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tracksuit', () => {
        const returnedFromService = Object.assign(
          {
            tracksuitId: 1,
            name: 'BBBBBB',
            sizeMin: 1,
            sizeMax: 1,
            weightMin: 1,
            weightMax: 1,
            comment: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Tracksuit', () => {
        const returnedFromService = Object.assign(
          {
            tracksuitId: 1,
            name: 'BBBBBB',
            sizeMin: 1,
            sizeMax: 1,
            weightMin: 1,
            weightMax: 1,
            comment: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Tracksuit', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
