export interface Meeting {
  meetingId: number;
  title: string;
  place: string;
  date: Date;
}

export interface MeetingPresence {
  meetingId: number;
  scoutId: number;
}
