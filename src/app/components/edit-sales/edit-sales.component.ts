import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  BuyerAbstractModel,
  Fees ,
} from 'src/app/models/buyer.model';
import { projectServices } from 'src/app/services/records.services';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  styleUrls: ['./edit-sales.component.css'],
  providers: [projectServices],
})
export class EditSalesComponent implements OnInit {
  salesData!: BuyerAbstractModel;
  datas: any;
  salesRebate!: number;
  totalRebate!: number;
  salesTax!: number;
  id!: string;
  res!: BuyerAbstractModel;
  taxableAmount!: number;
  showLoader= false;
  @Input() fromGroupName!: string; 


  constructor(
    private fromGroupDirective : FormGroupDirective,
    @Inject(MAT_DIALOG_DATA) public data: BuyerAbstractModel,
    private matDialogRef: MatDialogRef<EditSalesComponent>,
    private snackBar: MatSnackBar,
    private service: projectServices,
    private notificationService : NotificationService
  ) {
    this.salesData = data;
    this.id = this.salesData.id;
  }


  ngOnInit(): void {
    this.setValues();

  
  }

  editSales = new FormGroup({
    salesTaxDate: new FormControl('', Validators.required),
    salesPrice: new FormControl(0, Validators.required) ,
    manufacturerRebate: new FormControl(0, Validators.required),
    totalTradeInAllowance: new FormControl(0, Validators.required),
    salesTaxCategory: new FormControl('', Validators.required),
    progressingCounty: new FormControl('', Validators.required),
  });

  onkeyUp(event: any){
    const purchaseRate = parseInt(event.target.value);
    this.salesRebate = purchaseRate - this.totalRebate;
    this.salesTax = purchaseRate * 0.13;
    this.taxableAmount = purchaseRate;

  }

  onTotalRebateKeyUp(event: any){
    const manufacturerRebate = parseInt(event.target.value)
    this.totalRebate = this.salesData.soldFinance.finalFinancingAmounts.dealerRebate + manufacturerRebate;
    this.salesRebate = this.salesRebate - this.totalRebate;
  }

  setValues() {
    const salesData = this.salesData;
    this.totalRebate = salesData.soldFinance.finalFinancingAmounts.dealerRebate + salesData.soldFinance.finalFinancingAmounts.manufacturerRebate;
    this.salesRebate = salesData.soldFinance.finalFinancingAmounts.purchasePrice - this.totalRebate;
    this.salesTax =  0.13 * salesData.soldFinance.finalFinancingAmounts.purchasePrice;
    this.taxableAmount = salesData.soldFinance.finalFinancingAmounts.purchasePrice;
    this.editSales.setValue({
      salesTaxDate: salesData.soldFinance.finalFinancingAmounts.salesTaxDate,
      salesPrice: salesData.soldFinance.finalFinancingAmounts.purchasePrice as number,
      manufacturerRebate: salesData.soldFinance.finalFinancingAmounts.manufacturerRebate as number,
      totalTradeInAllowance: salesData.soldFinance.finalFinancingAmounts.totalTradeInAllowance as number,
      salesTaxCategory: '',
      progressingCounty: salesData.soldFinance.finalFinancingAmounts.fees.county as string | any,
    });
  }

  map() {
    const res = this.editSales.value;
    const salesData = this.salesData;

    const fees = salesData.soldFinance.finalFinancingAmounts.fees as Fees;
    fees.salesTax = this.salesTax as number;

    const finalFinancingAmounts = salesData.soldFinance.finalFinancingAmounts;
    finalFinancingAmounts.manufacturerRebate =  res.manufacturerRebate as number;
    finalFinancingAmounts.purchasePrice = parseInt(res.salesPrice as any);
    finalFinancingAmounts.salesTaxDate = res.salesTaxDate as string;
    finalFinancingAmounts.totalTradeInAllowance = parseInt(res.totalTradeInAllowance as any);
    finalFinancingAmounts.fees = fees;
      
    const soldFinance = salesData.soldFinance;
    soldFinance.finalFinancingAmounts = finalFinancingAmounts;

    const updatedSales = salesData;
    updatedSales.soldFinance = soldFinance;

    
    return updatedSales;
  }

  async editSalesAndTax() {
    this.showLoader = true;
    const data = this.editSales.value;
    const updatedSales = this.map();
     if (this.editSales) {
       try {
         const resp = await this.service.editBuyer(this.id, updatedSales);
         if (resp.id) {
          this.notificationService.success("Uploaded Successfully!!!");

          // this.notificationService.showNotification( 'Edited Successfully!!!');

          
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
