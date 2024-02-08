import { Injectable } from '@angular/core';
import { MemberBase, allMembers } from '@team-manager/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeamsApiService } from '../api/teams-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class MembersDataService {
  public members$ = new BehaviorSubject<MemberBase[]>(allMembers);
  public availableMembers$ = new BehaviorSubject<MemberBase[]>(allMembers);

  constructor(private teamsApiService: TeamsApiService) {}

  getAllMembers(): Observable<MemberBase[]> {
    return this.members$;
  }

  getDisponibleMembers(): Observable<MemberBase[]> {
    const unavailableMembers: MemberBase[] = [];

    this.teamsApiService
      .getTeams()
      .pipe(untilDestroyed(this))
      .subscribe((teams) => {
        teams.forEach((team) => unavailableMembers.push(...team.membersList));
        const availableMembers = allMembers.filter(
          (member) => !unavailableMembers.some((m) => m.id === member.id)
        );
        this.availableMembers$.next(availableMembers);
      });
    return this.availableMembers$;
  }
}
