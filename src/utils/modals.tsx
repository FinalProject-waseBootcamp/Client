// import mongoose from 'mongoose';

export enum Roles {
  MAIN_ADMIN,
  ADMIN,
  MANAGER,
  USER,
}
export enum Status {
  SENT,
  PENDING,
  APPROVE,
  REJECT
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
export interface Marker{
  managerId?: string,
  systemId?:string,
  lat:number,
  lng:number,
  name:string ,
  address:string,
  city:string,
  description?:string,
  color?:string,
  notes?: string,
  email?: string,
  phone?: string,
  _id: string
}
export interface Manager  {
  user_id:  string,
  systemId: string,
  active: boolean,
  display_name: string,
  role: Roles,
  invitation_sent: string;
}

export interface Position{
  lat:number,
  lng:number
}
export interface Map{
  zoom:number;
  center:Position
}
export interface Request {
  status: Status,
  // system_id: mongoose.Schema.Types.ObjectId,
  system_id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  // notesForManager: string,
  display_name: string,
  description: string,
  notesForDiaplay: string,
  markerAddress:{
      land:string,
      city:string,
      street:string,
      building:string
  }
}