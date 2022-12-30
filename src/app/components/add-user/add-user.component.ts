import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address, Buyer, BuyerAbstractModel, Person, RetailVehicle,ApplicantCase, BuyerType, SoldFinance, FinalFinancingAmount, Fees, Type, LienHolders } from 'src/app/models/buyer.model';
import { projectServices } from 'src/app/services/records.services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  form!: FormGroup;
  salesRebate!: number;
  totalRebate!: number;
  salesTax!: number;
  taxableAmount!: number;
  salesData!: BuyerAbstractModel;
  salesForms!: FormGroup;
  buyerList!: BuyerAbstractModel[] ;
  id!: string;
  buyerTypeList!: BuyerType;
  res!: RetailVehicle ;

  constructor(
    private formbuilder: FormBuilder,
    private projectService : projectServices
  ){
    // this.buyerTypeList = this.responseData.buyerType
  }
  
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      addVehicleForm: this.vehicleForm()
    })
    // this.getAllData();
  }

  get vehicleFormControl(){
    return this.form;

  }
  createdAt= new FormGroup({
    createdAt: new FormControl(Date, Validators.required)
  })


  editForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('',  Validators.required ),
    lastName: new FormControl('',  Validators.required),
    suffix: new FormControl('',  Validators.required),
    street1: new FormControl('',  Validators.required),
    street2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('' ,Validators.required,),
    zipCode: new FormControl('',  Validators.required),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', Validators.required),
    isMilitary: new FormControl(false),
    buyerType: new FormControl(),
    createdAt: new FormControl('',Validators.required),
    isRenewalRecipient: new FormControl(false),
    sendRenewalByEmail: new FormControl(false),
  });

  vehicleForm(): FormGroup {
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
      grossWeight: [0, Validators.required]
    });
  }

  salesForm = new FormGroup({
    salesTaxDate: new FormControl('', Validators.required),
    salesPrice: new FormControl(0, Validators.required) ,
    manufacturerRebate: new FormControl(0, Validators.required),
    totalTradeInAllowance: new FormControl(0, Validators.required),
    salesTaxCategory: new FormControl('', Validators.required),
    progressingCounty: new FormControl('', Validators.required),
    dealerRebate : new FormControl(0, Validators.required),
    fairMarketValue: new FormControl(0, Validators.required),
    grossPurchasePrice: new FormControl(0, Validators.required),
    latePenaltyPercentage: new FormControl(5, Validators.required),
    purchasePrice: new FormControl(0, Validators.required),
    tradeInSalesTaxCreditAmount: new FormControl(0, Validators.required),
    taxId: new FormControl('', Validators.required),
   });


  async getAllData() {
    this.buyerList = await this.projectService.getAllBuyers();
  }

  map() {
    const sales = this.salesForm.value;
    debugger;
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
      vin: this.form.value.addVehicleForm.vin,
      stockNumber:this.form.value.addVehicleForm.stockNumber,      
      modelYear: this.form.value.addVehicleForm.modelYear,
      makeCode: this.form.value.addVehicleForm.makeCode,
      make: this.form.value.addVehicleForm.make,
      modelCode: this.form.value.addVehicleForm.modelCode,
      model: this.form.value.addVehicleForm.model,
      bodyStyleCode: this.form.value.addVehicleForm.bodyStyleCode,
      bodyStyle: this.form.value.addVehicleForm.bodyStyle,
      carryingCapacity: this.form.value.addVehicleForm.carryingCapacity,
      emptyWeight: this.form.value.addVehicleForm.emptyWeight,
      grossWeight: this.form.value.addVehicleForm.grossWeight,
      majorColorCode: this.form.value.addVehicleForm.majorColorCode,
      majorColor: this.form.value.addVehicleForm.majorColor,
      minorColorCode: this.form.value.addVehicleForm.minorColorCode,
      minorColor: this.form.value.addVehicleForm.minorColor,
    };debugger;
    const fees: Fees ={
      county: 0,
      dieselVehicleEmissionsFee: 0,
      eTag: 0,
      inspectionFee: 0,
      message: 'message',
      missingProperties: null,
      plateAndSticker: 0,
      processingAndHandling: 0,
      processingCountyCode: 'Processing County Code',
      processingCountyName: 'Processing County Name',
      salesTax: 0,
      titleApplication: 0,
      totalFees: 0,
      totalFeesAndTax: 0,
    }

    const finalFinancingAmounts : FinalFinancingAmount = {
      dealerRebate: sales.dealerRebate as number,
      fairMarketValue:sales.fairMarketValue as number ,
      fees: fees,
      grossPurchasePrice: sales.grossPurchasePrice as number,
      latePenaltyPercentage: sales.latePenaltyPercentage as number,
      manufacturerRebate: sales.manufacturerRebate as number,
      purchasePrice:sales.purchasePrice as number,
      salesTaxCategory: null,
      salesTaxDate:sales.salesTaxDate as string,
      salesTaxExemptionReason: null,
      taxId: sales.taxId as string,
      totalTradeInAllowance: sales.totalTradeInAllowance as number,
      tradeInSalesTaxCreditAmount: sales.tradeInSalesTaxCreditAmount as number

    }
    debugger;

    
    const soldFinance: SoldFinance = {
      finalFinancingAmounts : finalFinancingAmounts,
      lesser: null,
      lienHolders: [{
        date: "21/07/2021" as any,
        id: "ID1",
        organization: {
          address: "Bank Address, Abc Street, Amrika",
          fein: "ID-101",
          name: "Bank of America"
          }
        
      }],
      salesOrderNumber: 1,
      type: Type.Lease,
      tradeIn: null
    }
    const updatedBuyer: BuyerAbstractModel = {
      id: this.id,
      createdAt: this.createdAt.value.createdAt as Date | any ,
      buyerType: parseInt(this.buyerTypeList as any),
      buyer: buyer,
      retailVehicle: rv,
      soldFinance: soldFinance
    };
    debugger;
    
    return updatedBuyer;
  }
}
