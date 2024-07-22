import { Injectable } from '@angular/core';
import { Group } from '../../models/group.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = `${environment.apiUrl}/groups`;

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  getGroupById(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group);
  }

  updateGroup(id: string, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, group);
  }

  patchGroup(id: string, group: Partial<Group>): Observable<Group> {
    return this.http.patch<Group>(`${this.apiUrl}/${id}`, group);
  }

  deleteGroup(id: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.message));
  }
}
