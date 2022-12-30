import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  Address,
  ApplicantCase,
  Buyer,
  BuyerAbstractModel,
  BuyerType,
  Person,
  RetailVehicle,
} from '../../models/buyer.model';

import { projectServices } from '../../services/records.services';
import { firstNameValidator, middleNameValidator, lastNameValidator, emailValidator} from 'src/app/validators.editperson';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-form-person',
  templateUrl: './edit-form-person.component.html',
  styleUrls: ['./edit-form-person.component.css'],
  providers: [projectServices],
})
export class EditFormPersonComponent implements OnInit {
  datas!: BuyerAbstractModel;
  id!: string;
  responseData!: BuyerAbstractModel;
  buyerTypeList!: BuyerType;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BuyerAbstractModel,
    private service : projectServices,
    private matDialogRef : MatDialogRef<EditFormPersonComponent>,
    private notificationService: NotificationService
  ) {
    this.responseData = data;
    console.log('Response Data', this.responseData);
    this.id = this.responseData.id;
    this.buyerTypeList = this.responseData.buyerType;
  }

  editForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, firstNameValidator()]),
    middleName: new FormControl('',  [Validators.required, middleNameValidator()] ),
    lastName: new FormControl('',  [Validators.required, lastNameValidator()]),
    suffix: new FormControl('',  Validators.required),
    street1: new FormControl('',  Validators.required),
    street2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('' ,Validators.required,),
    zipCode: new FormControl('',  Validators.required),
    email: new FormControl('', [Validators.required, emailValidator()]),
    phone: new FormControl('', Validators.required),
    isMilitary: new FormControl(false),
    buyerType: new FormControl(),
    isRenewalRecipient: new FormControl(false),
    sendRenewalByEmail: new FormControl(false),
  });

  ngOnInit(): void {
    this.setvalues();
  }

  public get BuyerType() {
    return BuyerType;
  }

  setvalues() {
     const data = this.responseData;
     debugger;
     this.editForm.setValue({
       firstName: data.buyer.person.firstName,
       middleName: data.buyer.person.middleName,
       lastName: data.buyer.person.lastName,
       suffix: data.buyer.person.suffix,
       street1: data.buyer.person.address.street1,
       street2: data.buyer.person.address.street2,
       city: data.buyer.person.address.city,
       state: 'bagmati' ,
       country: data.buyer.person.address.country,
       zipCode: data.buyer.person.address.zipCode,
       email: data.buyer.email,
       phone: data.buyer.phone,
       buyerType: 0 as any,
       isMilitary: data.buyer.person.isMilitary,
       isRenewalRecipient: data.buyer.person.isRenewalRecipient,
       sendRenewalByEmail: data.buyer.person.sendRenewalByEmail,
     });
     this.loading = false;

     debugger;
  }

  map() {
    const res = this.editForm.value;
    const address: Address = {
      street1: this.editForm.value.street1 as string,
      street2: this.editForm.value.street2 as string,
      city: this.editForm.value.city as string,
      state: this.editForm.value.state as string,
      country: this.editForm.value.country as string,
      zipCode: this.editForm.value.zipCode as string,
    };
    const person: Person = {
      firstName: this.editForm.value.firstName as string | any,
      middleName: this.editForm.value.middleName as string,
      lastName: this.editForm.value.lastName as string,
      suffix: this.editForm.value.suffix as string,
      address: address,
      isMilitary: this.editForm.value.isMilitary as any,
      isRenewalRecipient: this.editForm.value.isRenewalRecipient as any,
      sendRenewalByEmail: this.editForm.value.sendRenewalByEmail as any,
    };
    const buyer: Buyer = {
      organization: '',
      person: person,
      phone: this.editForm.value.phone as string,
      email: this.editForm.value.email as string,
      applicantCase: ApplicantCase.PERSON,
    };

    const rv: RetailVehicle = {
      vin: this.responseData.retailVehicle.vin,
      stockNumber: this.responseData.retailVehicle.stockNumber,
      modelYear: this.responseData.retailVehicle.modelYear,
      makeCode: this.responseData.retailVehicle.makeCode,
      make: this.responseData.retailVehicle.make,
      modelCode: this.responseData.retailVehicle.modelCode,
      model: this.responseData.retailVehicle.model,
      bodyStyleCode: this.responseData.retailVehicle.bodyStyleCode,
      bodyStyle: this.responseData.retailVehicle.bodyStyle,
      carryingCapacity: this.responseData.retailVehicle.carryingCapacity,
      emptyWeight: this.responseData.retailVehicle.emptyWeight,
      grossWeight: this.responseData.retailVehicle.grossWeight,
      majorColorCode: this.responseData.retailVehicle.majorColorCode,
      majorColor: this.responseData.retailVehicle.majorColor,
      minorColorCode: this.responseData.retailVehicle.minorColorCode,
      minorColor: this.responseData.retailVehicle.minorColor,
    };
    const updatedBuyer: BuyerAbstractModel = {
      id: this.id,
      createdAt: this.responseData.createdAt,
      buyerType: parseInt(this.buyerTypeList as any),
      buyer: buyer,
      retailVehicle: rv,
      soldFinance: this.responseData.soldFinance
    };
    
    return updatedBuyer;
  }

    async editBuyer() {
    this.loading = true;
    const data = this.editForm.value;
    const updatedSales = this.map();
     if (this.editForm) {
       try {
         const resp = await this.service.editBuyer(this.id, updatedSales);
         if (resp.id) {
          this.notificationService.success("Uploaded Successfully!!!");
          this.matDialogRef.close('true');  
      }
         else {
           alert('data not updated');
         }
       } catch (error) {
         alert('error');
       }
     }

  }
}

