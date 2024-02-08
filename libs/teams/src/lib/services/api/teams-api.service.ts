import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Team, teamList } from '@team-manager/models';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TeamsApiService {
  public teams$ = new BehaviorSubject<Team[]>(teamList);
  public team$ = new BehaviorSubject<Team | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) {}

  getTeams() {
    return this.teams$;
    // API call
    // return this.http.get<Team[]>('api/teams');
  }

  getTeam(id: number) {
    const teams: Team[] = this.teams$.getValue();
    const team = teams.find((team) => team.id === id);
    this.team$.next(team);
    return this.team$;
    // API call
    // return this.http.get<Team>(`api/teams/${id}`);
  }

  createTeam(team: Team) {
    const newTeam = {
      ...team,
      id: Math.floor(Math.random() * 100),
      membersList: [],
    };
    this.teams$.next([...teamList, newTeam]);
    return this.teams$;
    // API call
    //return this.http.post<CreateTeam>(`api/teams`, team);
  }

  updateTeam(team: Team) {
    const updatedTeams: Team[] = this.teams$.getValue();
    updatedTeams.forEach((item, index) => {
      if (item.id === team.id) {
        updatedTeams[index] = team;
        this.team$.next(team);
      }
    });
    this.teams$.next(updatedTeams);
    return this.teams$;
    // API call
    // return this.http.put<Team>(`api/teams/${team.id}`, team);
  }

  deleteTeam(id: number) {
    const updatedTeams: Team[] = this.teams$.getValue();
    const finalTeams = updatedTeams.filter((team) => team.id !== id);

    this.teams$.next(finalTeams);
    this.router.navigate(['/']);
    return this.teams$;
    // API call
    // return this.http.delete<Team>(`api/teams/${id}`);
  }
}
