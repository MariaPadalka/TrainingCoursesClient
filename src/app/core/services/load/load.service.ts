import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { Load } from '../../models/load.model';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private apiUrl = environment.apiUrl;
  private basePath = 'loads';

  constructor(private http: HttpClient) {}

  getLoads(filters: any = {}): Observable<Load[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<Load[]>(`${this.apiUrl}/${this.basePath}`, { params });
  }

  getTeachersLoads(): Observable<Load[]> {
    return this.http.get<Load[]>(`${this.apiUrl}/${this.basePath}/current`);
  }
}
