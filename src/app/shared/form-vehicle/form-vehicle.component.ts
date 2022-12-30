import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css'],
})
export class FormVehicleComponent {

  @Input() formGroupName!: string;

  vehicleForm!: FormGroup;


  constructor(private rootFormGroup: FormGroupDirective){}

  ngOnInit(): void {
    this.vehicleForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
