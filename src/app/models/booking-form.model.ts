export interface BookingFormDto {
  bookingId: number;
  bookingNumber: string;
  propertyId: number;
  userId: number;
  bedId: number; 

  checkInDate: Date;     // YYYY-MM-DD
  checkOutDate: Date;    // YYYY-MM-DD

  monthlyRent: number;
  securityDeposit: number;

  durationMonths: number;  // required
  status: string;

  specialRequests?: string | null;

  paymentMethod?: string;
  paymentNotes?: string;
}
