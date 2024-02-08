import { Roles } from '../enums';

export interface MemberBase {
  id: number;
  name: string;
}

export interface Member extends MemberBase {
  role: Roles;
  position?: string;
}
