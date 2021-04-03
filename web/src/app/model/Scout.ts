import { InstructorRank } from './InstructorRank';
import { Rank } from './Rank';
import { Troop } from './Troop';

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

  troop: Troop;
  rank: Rank;
  instructorRank?: InstructorRank;
}
