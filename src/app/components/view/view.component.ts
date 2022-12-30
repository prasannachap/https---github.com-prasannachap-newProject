import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditFormPersonComponent } from '../edit-form-person/edit-form-person.component';
import {projectServices} from '../../services/records.services';
import { MatDialog } from '@angular/material/dialog';
import { EditVehicleComponent } from '../edit-vehicle/edit-vehicle.component';
import { BuyerAbstractModel } from '../../models/buyer.model';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { EditSalesComponent } from '../edit-sales/edit-sales.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [projectServices]

})


  export class ViewComponent implements OnInit {
  id !: string;
  subscription: any;
  buyer! : BuyerAbstractModel  ;
  salePriceLessRebate!: number;
  dealerAndManufactureRebate!: number;
  loading= false;

  
  constructor(
    private services: projectServices,
    private route : ActivatedRoute,
    public dialog: MatDialog
  ){
    this.id = this.route.snapshot.params['id'];
    debugger;


  }
  ngOnInit(): void {
    this.loading =true;
    this.getBuyerById()
    debugger;
  }

 async getBuyerById(){

  this.buyer = await this.services.getBuyerById(this.id);
  this.loading = false;
  debugger;
  
  this.salePriceLessRebate = this.buyer.soldFinance.finalFinancingAmounts.purchasePrice -( this.buyer.soldFinance.finalFinancingAmounts.dealerRebate  + this.buyer.soldFinance.finalFinancingAmounts.manufacturerRebate)
  this.dealerAndManufactureRebate = this.buyer.soldFinance.finalFinancingAmounts.dealerRebate  + this.buyer.soldFinance.finalFinancingAmounts.manufacturerRebate
  }
  
  openDialogPerson(id: string){
    const dialogRef = this.dialog.open(EditFormPersonComponent, {
      width: '1200px', 
      data: this.buyer,
    });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getBuyerById();
        }
        // console.log(`Dialog result: ${result}`);
      });
  }

  openDialogVehicle(id: string){
    const dialogRef = this.dialog.open(EditVehicleComponent, {
      width: '1200px', 
      data: this.buyer
    });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getBuyerById();
        }
        // console.log(`Dialog result: ${result}`);
      });
  }

  AddVehicle(id: string){
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      width: '1200px', 
      data: this.buyer
    });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getBuyerById();
        }
      });
  }

  openDialogSales(id: string){
    const dialogRef = this.dialog.open(EditSalesComponent , {
      width: '1200px', 
      data: this.buyer
    });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getBuyerById();
        }
      });
  }
}
