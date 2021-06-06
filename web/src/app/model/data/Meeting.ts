export interface Meeting {
  meetingId: number;
  title: string;
  place: string;
  date: Date;
  description: string;
}

export interface MeetingPresence {
  meetingId: number;
  scoutId: number;
}
