export interface Country {
  countryName: string;
  countryCode: string;
}
export interface Corporation {
  corporationType: string;
  corporationTypeId: number;
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: Country;
  corporation: Corporation;
}
