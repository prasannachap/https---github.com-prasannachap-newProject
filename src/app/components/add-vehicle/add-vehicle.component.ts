import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BuyerAbstractModel, RetailVehicle } from 'src/app/models/buyer.model';
import { projectServices } from 'src/app/services/records.services';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
  providers: [projectServices],
})
export class AddVehicleComponent implements OnInit {
  id!: string;
  vehicleData!: BuyerAbstractModel;
  res!: RetailVehicle;
  form!: FormGroup;

  constructor(
    private MatDialogRef: MatDialogRef<AddVehicleComponent>,
    private formbuilder: FormBuilder,
    private services: projectServices,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BuyerAbstractModel
  ) {
    this.vehicleData = data;
    this.id = this.vehicleData.id;
  }

  addVehicleForm(): FormGroup {
    return this.formbuilder.group({
      vin: ['', Validators.required],
      bodyStyle: ['', Validators.required],
      bodyStyleCode: ['', Validators.required],
      stockNumber: ['', Validators.required],
      model: ['', Validators.required],
      modelCode: ['', Validators.required],
      modelYear: ['', Validators.required],
      make: ['', Validators.required],
      makeCode: ['', Validators.required],
      carryingCapacity: ['', Validators.required],
      majorColor: ['', Validators.required],
      majorColorCode: ['', Validators.required],
      minorColor: ['', Validators.required],
      minorColorCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      addVehicleForm: this.addVehicleForm(),
    });
  }

  get vehicleFormControl() {
    return this.form;
  }

  map() {
    const res = this.form.value;
    debugger;

    const rv: RetailVehicle = {
      vin: res.addVehicleForm.vin as string,
      stockNumber: res.addVehicleForm.stockNumber as string,
      modelYear: res.addVehicleForm.modelYear as string,
      makeCode: res.addVehicleForm.makeCode as string,
      make: res.addVehicleForm.make as string,
      modelCode: res.addVehicleForm.modelCode as string,
      model: res.addVehicleForm.model as string,
      bodyStyleCode: res.addVehicleForm.bodyStyleCode as string,
      bodyStyle: res.addVehicleForm.bodyStyle as string,
      carryingCapacity: res.addVehicleForm.carryingCapacity as string,
      majorColorCode: res.addVehicleForm.majorColorCode as string,
      majorColor: res.addVehicleForm.majorColor as string,
      minorColorCode: res.addVehicleForm.minorColorCode as string,
      minorColor: res.addVehicleForm.minorColor as string,
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

  async addVehicle() {
    const vehicle = this.map();
    try {
      const resp = await this.services.addVehicle(vehicle);
      debugger;
      if (resp.id) {
        let config: MatSnackBarConfig = {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        };
        let simpleSnackBarRef = this.snackBar.open(
          'Data Added successfully!!!',
          '',
          config
        );
        setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), 3000);
        this.MatDialogRef.close('true');
      } else {
        alert('data not Added');
      }
    } catch (error) {
      alert('error');
    }
  }
}
