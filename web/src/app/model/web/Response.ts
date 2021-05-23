export interface ApiResponse<T> {
  data: T;
  timestamp: Date;
  userId: number;
  httpStatus: number;
}
