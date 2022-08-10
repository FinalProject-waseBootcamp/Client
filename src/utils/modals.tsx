enum Roles {
  MAIN_ADMIN,
  SYSTEM_ADMIN,
  LOCATION_USER,
  USER,
}

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  phone: string;
}

export interface System {
  uid: string | undefined;
  adminId: string;
  name: string;
  topic: string;
  description: string;
  communicationDetails: string;
  imgUrl : string;
}
