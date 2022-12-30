export interface BuyerAbstractModel {
  id: string;
  createdAt: Date;
  buyerType: BuyerType;
  buyer: Buyer;
  retailVehicle: RetailVehicle;
  soldFinance: SoldFinance;
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

export interface SoldFinance{
  finalFinancingAmounts : FinalFinancingAmount,
  lesser: null,
  lienHolders: LienHolders[],
  salesOrderNumber: number,
  type: Type,
  tradeIn: null
}

export interface FinalFinancingAmount{
dealerRebate: number,
fairMarketValue: number,
fees: Fees,
grossPurchasePrice: number,
latePenaltyPercentage: number,
manufacturerRebate: number,
purchasePrice:number,
salesTaxCategory: null,
salesTaxDate:string,
salesTaxExemptionReason: null,
taxId: string,
totalTradeInAllowance: number,
tradeInSalesTaxCreditAmount: number
}

export interface Fees {
county: number,
dieselVehicleEmissionsFee: number,
eTag: number,
inspectionFee: number,
message: string,
missingProperties: null,
plateAndSticker: number,
processingAndHandling: number,
processingCountyCode: string,
processingCountyName: string
salesTax: number,
titleApplication: number,
totalFees: number,
totalFeesAndTax: number,
}

export interface LienHolders{
    id: string;
    date: Date;
    organization: {
      name: string;
      fein: string;
      address: string;
    }
  
}

export enum Type{
  Lease,
  Cash
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
  grossWeight: number;
  majorColorCode: string;
  majorColor: string;
  minorColorCode: string;
  minorColor: string;
}

