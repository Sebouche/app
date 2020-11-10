import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISail } from 'app/shared/model/sail.model';

type EntityResponseType = HttpResponse<ISail>;
type EntityArrayResponseType = HttpResponse<ISail[]>;

@Injectable({ providedIn: 'root' })
export class SailService {
  public resourceUrl = SERVER_API_URL + 'api/sails';

  constructor(protected http: HttpClient) {}

  create(sail: ISail): Observable<EntityResponseType> {
    return this.http.post<ISail>(this.resourceUrl, sail, { observe: 'response' });
  }

  update(sail: ISail): Observable<EntityResponseType> {
    return this.http.put<ISail>(this.resourceUrl, sail, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISail>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISail[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
