export interface RegisterModel {
  propertyId: number;      // maps to PropertyId
  firstName: string;       // maps to FirstName
  lastName: string;        // maps to LastName
  password: string;        // maps to Password
  emailAddress: string;    // maps to EmailAddress
  phoneNumber?: string;    // maps to PhoneNumber
  roleIds: number[];       // maps to RoleIds
}