import { BuyerType } from "../buyer.model";

export class BuyerTableViewModel {
  id!: string ;
  createdAt!: Date;
  buyerType!: BuyerType;
  buyerName!: string;
  retailVehicleVin!: string;
}