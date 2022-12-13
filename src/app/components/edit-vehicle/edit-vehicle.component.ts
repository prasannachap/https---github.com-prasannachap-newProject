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

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
  providers: [projectServices],
})
export class EditVehicleComponent implements OnInit {
  id!: string;
  vehicleData!: BuyerAbstractModel;
  res!: RetailVehicle;
  form!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private services: projectServices,
    private MatDialogRef: MatDialogRef <EditVehicleComponent>,
    private snackBar : MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BuyerAbstractModel ,
    
  ) {
    this.vehicleData = data;
    debugger;
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
    })
  };

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      vehicleForm: this.vehicleForm(),
    });
  }

  map() {
    const res = this.vehicleForm();
    debugger

    const rv: RetailVehicle = {
      vin: res.value.vin as string,
      stockNumber:res.value.stockNumber as string,
      modelYear:res.value.modelYear as string,
      makeCode:res.value.makeCode as string,
      make:res.value.make as string,
      modelCode:res.value.modelCode as string,
      model:res.value.model as string,
      bodyStyleCode:res.value.bodyStyleCode as string,
      bodyStyle:res.value.bodyStyle as string,
      carryingCapacity:res.value.carryingCapacity as string,
      majorColorCode:res.value.majorColorCode as string,
      majorColor:res.value.majorColor as string,
      minorColorCode:res.value.minorColorCode as string,
      minorColor:res.value.minorColor as string,
      emptyWeight: '',
      grossWeight: '',
    };
    debugger;
    const updatedBuyer: BuyerAbstractModel = {
      id: this.id,
      createdAt: this.vehicleData.createdAt,
      buyerType: this.vehicleData.buyerType,
      buyer: this.vehicleData.buyer,
      retailVehicle: rv,
    };
    return updatedBuyer;
  }

  get vehicleFormControl(){
    return this.form;
  }

  async editVehicle() {
    const data = this.res;
    debugger;
    const updatedData = this.map();
    if (this.res) {
      try {
        const resp = await this.services.editBuyer(this.id, updatedData);
        debugger;
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
  