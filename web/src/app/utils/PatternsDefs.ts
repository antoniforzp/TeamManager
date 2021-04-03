export enum RegexPatterns {
  EMAIL = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  HAS_NUMBER = '\\d',
  HAS_CAPITAL = '[A-Z]',
  HAS_SMALL = '[a-z]',
  AT_LEAST_ONE_CHAR = '.',
  PESEL = '\\d{11}',
  POSTAL_CODE = '\\d{2}-\\d{3}',
  PHONE_NUMBER = '\\d{3}-\\d{3}-\\d{3}',
}
