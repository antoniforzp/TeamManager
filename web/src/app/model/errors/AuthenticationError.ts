export class AthenticationError implements Error {
  name: string;
  message: string;
  stack?: string;

  constructor(stack?: string) {
    this.name = 'AuthenticationError';
    this.message = 'The session has expired. Log in once again.';
    this.stack = stack;
  }
}
