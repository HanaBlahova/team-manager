import { Member } from './member.interface';

export interface Team {
  id: number;
  name: string;
  membersList: Member[];
}

export interface CreateTeam {
  name: string;
}
