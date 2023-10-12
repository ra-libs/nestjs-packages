export interface CustomerModel {
  accessPrivate: AccessPrivate;
  accessPublic: AccessPublic;
}

export interface AccessPrivate {
  id: string;
  username: string;
  name: string;
  socialName: string;
  email: string;
  phone: string;
  active: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  device: Device;
  createdAt: string;
  modifiedAt: string;
  customer: Customer;
  cfi: Cfi;
  card: Card;
}

export interface Device {
  id: string;
  model: string;
  vendor: string;
  os: string;
  createdAt: string;
}

export interface Customer {
  birthDate: string;
}

export interface Cfi {
  account: string;
  digit: string;
  branch: string;
}

export interface Card {
  account: string;
}

export interface AccessPublic {
  access_token: string;
  token_type: string;
  refresh_token: string;
  jti: string;
  sub: string;
  roles: string[];
  name: string;
  socialName: string;
  phone: string;
  email: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}
