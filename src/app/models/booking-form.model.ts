export interface BookingFormDto {
  bookingId: number;
  bookingNumber: string;
  propertyId: number;
  userId: number;
  bedId: number;
  checkInDate: Date;            // ISO date "YYYY-MM-DD"
  checkOutDate?: Date;   // ISO date or null
  plannedCheckOutDate: string;    // ISO date "YYYY-MM-DD"
  monthlyRent: number;
  securityDeposit: number;
  status: string;
  bookingType: string;
  specialRequests?: string | null;
}
