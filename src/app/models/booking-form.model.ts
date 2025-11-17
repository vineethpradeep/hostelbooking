export interface BookingFormDto {
  bookingId: number;
  bookingNumber: string;
  propertyId: number;
  userId: number;
  bedId: number;
  checkInDate: string;            // ISO date "YYYY-MM-DD"
  checkOutDate?: string | null;   // ISO date or null
  plannedCheckOutDate: string;    // ISO date "YYYY-MM-DD"
  monthlyRent: number;
  securityDeposit: number;
  status: string;
  bookingType: string;
  specialRequests?: string | null;
}
