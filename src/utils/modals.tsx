export enum Roles {
  MAIN_ADMIN,
  SYSTEM_ADMIN,
  LOCATION_USER,
  USER,
}

export interface User {
  uid?:string;
  firstName: string;
  lastName: string;
  email: string;
  password:string;
  role: Roles;
  phone: string;
}

export interface System {
  _id?: string;
  adminId: string;
  name: string;
  topic: string;
  description: string;
  communicationDetails: string;
  imgUrl : string;
  siteUrl: string;
}
