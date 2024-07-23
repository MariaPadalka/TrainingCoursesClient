import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { Load } from '../../models/load.model';
import { LoadPopulated } from '../../models/populated/load-populated';

@Injectable({
    providedIn: 'root',
})
export class LoadService {
    private apiUrl = environment.apiUrl;
    private basePath = 'loads';

    constructor(private http: HttpClient) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getLoads(filters: any = {}): Observable<LoadPopulated[]> {
        let params = new HttpParams();
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                params = params.set(key, filters[key]);
            }
        });
        return this.http.get<LoadPopulated[]>(
            `${this.apiUrl}/${this.basePath}`,
            {
                params,
            }
        );
    }

    getTeachersLoads(): Observable<LoadPopulated[]> {
        return this.http.get<LoadPopulated[]>(
            `${this.apiUrl}/${this.basePath}/current`
        );
    }

    getLoadById(id: string): Observable<LoadPopulated> {
        return this.http.get<LoadPopulated>(
            `${this.apiUrl}/${this.basePath}/${id}`
        );
    }

    createLoad(load: Partial<Load>): Observable<Load> {
        return this.http.post<Load>(`${this.apiUrl}/${this.basePath}`, load);
    }

    updateLoad(id: string, load: Partial<Load>): Observable<Load> {
        return this.http.put<Load>(
            `${this.apiUrl}/${this.basePath}/${id}`,
            load
        );
    }

    patchLoad(id: string, load: Partial<Load>): Observable<Load> {
        return this.http.patch<Load>(
            `${this.apiUrl}/${this.basePath}/${id}`,
            load
        );
    }

    deleteLoad(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${this.basePath}/${id}`);
    }
}
