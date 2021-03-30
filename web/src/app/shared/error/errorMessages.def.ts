export interface HttpError {
  name: string;
  message: string;
}

export enum ErrorIds {
  SERVER_COMMUNICATION,
}

export const errors = new Map<ErrorIds, HttpError>();
errors.set(ErrorIds.SERVER_COMMUNICATION, {
  message: 'Błąd komunikacji z serwerem',
  solution: 'Sprawdź połączenie internetowe.',
});