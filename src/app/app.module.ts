import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './materials/materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './components/view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditFormPersonComponent } from './components/edit-form-person/edit-form-person.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { FormVehicleComponent } from './shared/form-vehicle/form-vehicle.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    ViewComponent,
    EditFormPersonComponent,
    EditVehicleComponent,
    FormVehicleComponent, 
    AddVehicleComponent
  
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
