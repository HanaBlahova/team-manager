import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '@team-manager/models';

@Injectable()
export class MembersApiService {
  constructor(private http: HttpClient) {}

  getAllMembers() {
    // API call for illustration
    return this.http.get<Member[]>('api/members');
  }
}
