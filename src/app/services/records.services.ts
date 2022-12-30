import { GET_ALL_USERS_URL } from '../constant/constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BuyerAbstractModel, RetailVehicle } from '../models/buyer.model';

@Injectable()
export class projectServices {
  constructor(private httpClient: HttpClient) {}

  getAllBuyers = async (): Promise<BuyerAbstractModel[]> => {
    const response = await this.httpClient
      .get<BuyerAbstractModel[]>(GET_ALL_USERS_URL)
      .toPromise();
    return new Promise((resolve) => {
      resolve(response as BuyerAbstractModel[] | any);
    });
  };

  deleteBuyer = async (id: string): Promise<boolean> => {
    try {
      const response = await this.httpClient
        .delete<BuyerAbstractModel>(GET_ALL_USERS_URL + '/' + id)
        .toPromise();
      return true;
    } catch {
      return false;
    }
  };

  getBuyerById = async (id: string): Promise<BuyerAbstractModel> => {
    const response = await this.httpClient
      .get<BuyerAbstractModel>(GET_ALL_USERS_URL + '/' + id)
      .toPromise();
    return new Promise((resolve) => {
      resolve(response as BuyerAbstractModel | any);
    });
  };

  editBuyer = async (
    id: string,
    data: BuyerAbstractModel
  ): Promise<BuyerAbstractModel> => {
    const response = await this.httpClient
      .put(GET_ALL_USERS_URL + '/' + id, data)
      .toPromise();
    return new Promise((resolve) => {
      resolve(response as BuyerAbstractModel | any);
    });
  };

  addVehicle = async (
    data: BuyerAbstractModel
  ): Promise<BuyerAbstractModel> => {
    const response = await this.httpClient
      .post<BuyerAbstractModel>(GET_ALL_USERS_URL, data)
      .toPromise();
    return new Promise((resolve) => {
      resolve(response as BuyerAbstractModel | any);
    });
  };
}
