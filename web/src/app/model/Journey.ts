import { Meeting } from './Meeting';

export interface Journey extends Meeting {
  endDate: Date;
}

export interface JourneyPresence {
  journeyId: number;
  scoutId: number;
}
