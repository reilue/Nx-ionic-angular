import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

import { PermissionsModel } from '../../../models/endpoints/Permissions';

import { PATH } from '../../../api/base';

export const PATH_GET_SHOW_PERMISSIONS: string = PATH('Permissions', 'Index');

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getShow(): Promise<
    Observable<HttpResponse<PermissionsModel.ResponseShow[]>>
  > {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<PermissionsModel.ResponseShow[]>(
      PATH_GET_SHOW_PERMISSIONS,
      {
        headers: headers,
        observe: 'response'
      }
    );
  }
}
