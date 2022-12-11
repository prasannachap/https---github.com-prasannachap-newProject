import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { projectServices } from '../services/records.services';
import { BuyerAbstractModel, RetailVehicle } from '../models/buyer.model';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
  providers: [projectServices],
})
export class EditVehicleComponent implements OnInit {
  // MatDialogRef: any;
  // snackBar: any;
  id!: string;
  vehicleData!: BuyerAbstractModel;

  constructor(
    private formbuilder: FormBuilder,
    private services: projectServices,
    private MatDialogRef: MatDialogRef <EditVehicleComponent>,
    private snackBar : MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BuyerAbstractModel ,
    
  ) {
    this.vehicleData = data;
    this.id = this.vehicleData.id;
  }

  ngOnInit(): void {
    this.setValues();
  }

  vehicleForm = new FormGroup({
    vin: new FormControl(''),
    bodyStyle: new FormControl(''),
    bodyStyleCode: new FormControl(''),
    stockNumber: new FormControl(''),
    model: new FormControl(''),
    modelCode: new FormControl(''),
    modelYear: new FormControl(''),
    make: new FormControl(''),
    makeCode: new FormControl(''),
    carryingCapacity: new FormControl(''),
    majorColor: new FormControl(''),
    majorColorCode: new FormControl(''),
    minorColor: new FormControl(''),
    minorColorCode: new FormControl(''),
  });

  setValues() {
    const data = this.vehicleData;
    this.vehicleForm.setValue({
      vin: this.data.retailVehicle.vin,
      bodyStyle: this.data.retailVehicle.bodyStyle,
      bodyStyleCode: this.data.retailVehicle.bodyStyleCode,
      stockNumber: this.data.retailVehicle.stockNumber,
      model: this.data.retailVehicle.stockNumber,
      modelCode: this.data.retailVehicle.modelCode,
      modelYear: this.data.retailVehicle.modelYear,
      make: this.data.retailVehicle.make,
      makeCode: this.data.retailVehicle.makeCode,
      carryingCapacity: this.data.retailVehicle.carryingCapacity,
      majorColor: this.data.retailVehicle.majorColor,
      majorColorCode: this.data.retailVehicle.majorColorCode,
      minorColor: this.data.retailVehicle.minorColor,
      minorColorCode: this.data.retailVehicle.minorColorCode,
    });
  }

  map() {
    const res = this.vehicleForm.value;

    const rv: RetailVehicle = {
      vin: this.vehicleForm.value.vin as string,
      stockNumber: this.vehicleForm.value.stockNumber as string,
      modelYear: this.vehicleForm.value.modelYear as string,
      makeCode: this.vehicleForm.value.makeCode as string,
      make: this.vehicleForm.value.make as string,
      modelCode: this.vehicleForm.value.modelCode as string,
      model: this.vehicleForm.value.model as string,
      bodyStyleCode: this.vehicleForm.value.bodyStyleCode as string,
      bodyStyle: this.vehicleForm.value.bodyStyle as string,
      carryingCapacity: this.vehicleForm.value.carryingCapacity as string,
      majorColorCode: this.vehicleForm.value.majorColorCode as string,
      majorColor: this.vehicleForm.value.majorColor as string,
      minorColorCode: this.vehicleForm.value.minorColorCode as string,
      minorColor: this.vehicleForm.value.minorColor as string,
      emptyWeight: '',
      grossWeight: '',
    };
    const updatedBuyer: BuyerAbstractModel = {
      id: this.id,
      createdAt: this.vehicleData.createdAt,
      buyerType: this.vehicleData.buyerType,
      buyer: this.vehicleData.buyer,
      retailVehicle: rv,
    };
    debugger;
    return updatedBuyer;
  }

  async editVehicle() {
    const data = this.vehicleForm.value;
    debugger;
    const updatedData = this.map();
    if (this.vehicleForm) {
      try {
        const resp = await this.services.editBuyer(this.id, updatedData);
        debugger;
        // alert('updated')
        if (resp.id) {
          let config: MatSnackBarConfig = {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          };
          let simpleSnackBarRef = this.snackBar.open(
          'Data updated successfully!!!',
            '',
            config
          );
          setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), 3000);
          this.MatDialogRef.close('true');
        } 
        else {
          alert('data not updated');
        }
      } catch (error) {
        alert('error');
      }
    } else {
    }
  }
}
  