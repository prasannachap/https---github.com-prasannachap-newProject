import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { projectServices } from '../../services/records.services';
import { BuyerAbstractModel, RetailVehicle } from '../../models/buyer.model';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
  providers: [projectServices],
})
export class EditVehicleComponent implements OnInit {
  id!: string;
  vehicleData!: BuyerAbstractModel;
  form!: FormGroup;
  showLoader = false;

  constructor(
    private formbuilder: FormBuilder,
    private services: projectServices,
    private MatDialogRef: MatDialogRef <EditVehicleComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: BuyerAbstractModel ,
    
  ) {
    this.vehicleData = data;
    this.id = this.vehicleData.id;
  }

  vehicleForm(): FormGroup {
    
    return this.formbuilder.group({
    vin: [this.data.retailVehicle.vin, Validators.required],
    bodyStyle: [this.data.retailVehicle.bodyStyle, Validators.required],
    bodyStyleCode: [this.data.retailVehicle.bodyStyleCode, Validators.required],
    stockNumber: [this.data.retailVehicle.stockNumber, Validators.required],
    model: [this.data.retailVehicle.model, Validators.required],
    modelCode: [this.data.retailVehicle.modelCode, Validators.required],
    modelYear: [this.data.retailVehicle.modelYear, Validators.required],
    make: [this.data.retailVehicle.make, Validators.required],
    makeCode: [this.data.retailVehicle.makeCode, Validators.required],
    carryingCapacity: [this.data.retailVehicle.carryingCapacity, Validators.required],
    majorColor: [this.data.retailVehicle.majorColor, Validators.required],
    majorColorCode: [this.data.retailVehicle.majorColorCode, Validators.required],
    minorColor: [this.data.retailVehicle.minorColor, Validators.required],
    minorColorCode: [this.data.retailVehicle.minorColorCode, Validators.required],
    grossWeight: [this.data.retailVehicle.grossWeight, Validators.required]
    })
  };

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      vehicleForm: this.vehicleForm(),
    });
  }

  map() {
    const res = this.form.value;
    debugger

    const rv: RetailVehicle = {
      vin: res.vehicleForm.vin as string,
      stockNumber: res.vehicleForm.stockNumber as string,
      modelYear: res.vehicleForm.modelYear as string,
      makeCode: res.vehicleForm.makeCode as string,
      make: res.vehicleForm.make as string,
      modelCode: res.vehicleForm.modelCode as string,
      model: res.vehicleForm.model as string,
      bodyStyleCode: res.vehicleForm.bodyStyleCode as string,
      bodyStyle: res.vehicleForm.bodyStyle as string,
      carryingCapacity: res.vehicleForm.carryingCapacity as string,
      majorColorCode: res.vehicleForm.majorColorCode as string,
      majorColor: res.vehicleForm.majorColor as string,
      minorColorCode: res.vehicleForm.minorColorCode as string,
      minorColor: res.vehicleForm.minorColor as string,
      emptyWeight: '',
      grossWeight: res.vehicleForm.grossWeight as number,
    };
    debugger;
    const updatedBuyer: BuyerAbstractModel = {
      id: this.id,
      createdAt: this.vehicleData.createdAt,
      buyerType: this.vehicleData.buyerType,
      buyer: this.vehicleData.buyer,
      retailVehicle: rv,
      soldFinance: this.vehicleData.soldFinance
    };
    return updatedBuyer;
  }

  get vehicleFormControl(){
    return this.form;
  }

  async editVehicle() {
    this.showLoader =true;
    const updatedData = this.map();
    debugger;
    if (updatedData) {
      try {
        const resp = await this.services.editBuyer(this.id, updatedData);
        if (resp.id) {
          this.notificationService.success('Vehicle Edited Sucessfully')
          this.showLoader = false;
          this.MatDialogRef.close('true');
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
