import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment as env } from '../../../environments/environment';
import { BehaviorSubject, Observable,Subscription } from 'rxjs';
import { ResponseVm, top_district_data } from './ResponseVM';

const url: string = env.apiUrl + "/Lookup";

@Injectable({providedIn: 'root', // Ensures a single instance of the service
  })
export class MapService {
  invokeFirstComponentFunction = new EventEmitter();

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
  }


GetTopDistrictsData(status:string): Observable<ResponseVm<top_district_data[]>> {
    return this._httpClient.get<ResponseVm<top_district_data[]>>(url + '/GetTopDistrictsData?status='+status);
  }

}


