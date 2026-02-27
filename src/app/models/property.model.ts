export interface PropertyDto {
  PropertyId: number;
  PropertyName: string;
  PropertyCode: string; 
  Address: string;
  City: string;
  State: string;
  Country: string;  
  PostalCode: string;
  ContactNumber: string;
  EmailAddress: string;
  TotalRooms: number;
  PropertyType: string;  
  IsActive: boolean;
  Description?: string;
}
