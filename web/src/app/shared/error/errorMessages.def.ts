export interface HttpError {
  name: string;
  message: string;
}

export enum ErrorIds {
  SERVER_COMMUNICATION,
}
