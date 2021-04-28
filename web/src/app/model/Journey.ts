export interface Journey {
  journeyId: number;
  title: string;
  place: string;
  startDate: Date;
  endDate: Date;
}

export interface JourneyPresence {
  journeyId: number;
  scoutId: number;
}
