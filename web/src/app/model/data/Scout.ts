import { IRank as IRank } from './IRank';
import { Rank } from './Rank';
import { Patrol } from './Patrol';

export interface Scout {
  scoutId: number;
  name: string;
  surname: string;
  pesel: string;
  birthDate: Date;
  address: string;
  postalCode: string;
  city: string;
  phone: string;

  patrol: Patrol;
  rank: Rank;
  irank: IRank;
}
