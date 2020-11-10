import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICursus } from 'app/shared/model/cursus.model';

type EntityResponseType = HttpResponse<ICursus>;
type EntityArrayResponseType = HttpResponse<ICursus[]>;

@Injectable({ providedIn: 'root' })
export class CursusService {
  public resourceUrl = SERVER_API_URL + 'api/cursuses';

  constructor(protected http: HttpClient) {}

  create(cursus: ICursus): Observable<EntityResponseType> {
    return this.http.post<ICursus>(this.resourceUrl, cursus, { observe: 'response' });
  }

  update(cursus: ICursus): Observable<EntityResponseType> {
    return this.http.put<ICursus>(this.resourceUrl, cursus, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICursus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICursus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
