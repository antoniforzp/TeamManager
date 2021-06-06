export interface Journey {
  journeyId: number;
  title: string;
  place: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface JourneyPresence {
  journeyId: number;
  scoutId: number;
}
