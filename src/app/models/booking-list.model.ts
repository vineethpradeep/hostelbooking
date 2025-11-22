export interface Booking {
    propertyId?: number;
  userId?: number;
  bedId?: number;
  status?: string;
  fromDate?: Date;
  toDate?: Date;
  page?: number;
  pageSize?: number;
}
