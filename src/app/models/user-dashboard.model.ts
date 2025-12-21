// Amenities
export interface RoomAmenities {
  roomId: number;
  amenities: string;
}

// Upcoming Payments
export interface UpcomingPayment {
  paymentId: number;
  paymentType: string;
  amount: number;
  dueDate: string;   // ISO date string
  status: string;    // Due Soon | Upcoming | Overdue
}

// Maintenance Requests
export interface MaintenanceRequest {
  maintenanceRequestId: number;
  issue: string;
  description: string;
  dateRaised: string; // ISO date string
  status: string;     // Open | In Progress | Resolved
}
