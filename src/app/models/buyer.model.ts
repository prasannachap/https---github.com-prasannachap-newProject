export interface BuyerAbstractModel {
  id: string;
  createdAt: Date;
  buyerType: BuyerType;
  buyer: Buyer;
  retailVehicle: RetailVehicle;
}

// BUYERS START
export enum BuyerType {
  PERSON,
  ORGANIZATION,
}
export enum ApplicantCase {
  ORGANIZATION,
  PERSON,
}

export interface Buyer {
  organization: string;
  person: Person;
  phone: string;
  email: string;
  applicantCase: ApplicantCase;
}

export interface Person {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  address: Address;
  isMilitary: boolean;
  isRenewalRecipient: boolean;
  sendRenewalByEmail: boolean;
}
export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  
}
//BUYERS END
// VEHICLE

export interface RetailVehicle {
  vin: string;
  stockNumber: string;
  modelYear: string;
  makeCode: string;
  make: string;
  modelCode: string;
  model: string;
  bodyStyleCode: string;
  bodyStyle: string;
  carryingCapacity: string;
  emptyWeight: string;
  grossWeight: string;
  majorColorCode: string;
  majorColor: string;
  minorColorCode: string;
  minorColor: string;
}