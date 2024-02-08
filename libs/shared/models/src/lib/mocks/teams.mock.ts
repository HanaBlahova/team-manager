import { Roles } from '../enums';
import { Team } from '../interfaces';

export const teamList: Team[] = [
  {
    id: 1,
    name: 'Tenerife Sport Club',
    membersList: [
      {
        id: 3,
        name: 'Luis Winchester',
        role: Roles.TRAINER,
        position: 'center',
      },
      {
        id: 4,
        name: 'José Armando',
        role: Roles.PLAYER,
        position: 'back',
      },
      {
        id: 5,
        name: 'Dennis Cook',
        role: Roles.PLAYER,
        position: 'front',
      },
      {
        id: 6,
        name: 'Juan Lorenzo',
        role: Roles.BOTH,
        position: 'center',
      },
    ],
  },
  {
    id: 2,
    name: 'Gran Canaria Sport Club',
    membersList: [
      {
        id: 1,
        name: 'John Snow',
        role: Roles.PLAYER,
        position: 'back',
      },
      {
        id: 2,
        name: 'Javier Fererra',
        role: Roles.TRAINER,
        position: 'center',
      },
      {
        id: 7,
        name: 'Samuel García',
        role: Roles.PLAYER,
        position: 'back',
      },
    ],
  },
];
