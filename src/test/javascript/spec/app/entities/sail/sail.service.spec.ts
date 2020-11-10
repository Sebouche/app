import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SailService } from 'app/entities/sail/sail.service';
import { ISail, Sail } from 'app/shared/model/sail.model';
import { SportLevel } from 'app/shared/model/enumerations/sport-level.model';

describe('Service Tests', () => {
  describe('Sail Service', () => {
    let injector: TestBed;
    let service: SailService;
    let httpMock: HttpTestingController;
    let elemDefault: ISail;
    let expectedResult: ISail | ISail[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SailService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Sail(0, 'AAAAAAA', 'AAAAAAA', 0, SportLevel.BEGINNER, false, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Sail', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Sail()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Sail', () => {
        const returnedFromService = Object.assign(
          {
            sailId: 'BBBBBB',
            name: 'BBBBBB',
            area: 1,
            level: 'BBBBBB',
            usable: true,
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

      it('should return a list of Sail', () => {
        const returnedFromService = Object.assign(
          {
            sailId: 'BBBBBB',
            name: 'BBBBBB',
            area: 1,
            level: 'BBBBBB',
            usable: true,
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

      it('should delete a Sail', () => {
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
