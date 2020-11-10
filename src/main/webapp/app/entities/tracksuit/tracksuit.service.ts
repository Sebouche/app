import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITracksuit } from 'app/shared/model/tracksuit.model';

type EntityResponseType = HttpResponse<ITracksuit>;
type EntityArrayResponseType = HttpResponse<ITracksuit[]>;

@Injectable({ providedIn: 'root' })
export class TracksuitService {
  public resourceUrl = SERVER_API_URL + 'api/tracksuits';

  constructor(protected http: HttpClient) {}

  create(tracksuit: ITracksuit): Observable<EntityResponseType> {
    return this.http.post<ITracksuit>(this.resourceUrl, tracksuit, { observe: 'response' });
  }

  update(tracksuit: ITracksuit): Observable<EntityResponseType> {
    return this.http.put<ITracksuit>(this.resourceUrl, tracksuit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITracksuit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITracksuit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
