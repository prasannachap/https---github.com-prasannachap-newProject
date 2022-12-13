import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { GET_ALL_USERS_URL } from '../../constant/constant';
import { BuyerAbstractModel } from '../../models/buyer.model';
import { BuyerTableViewModel } from '../../models/viewModel/buyerViewModel.model';
import { projectServices } from '../../services/records.services';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers:[projectServices]
})
export class TableComponent implements OnInit{
  buyers: BuyerAbstractModel[] = [];
  displayedColumns: string[] = ['id', 'createdAt','buyer','retail','action'];
  buyersList : BuyerTableViewModel[] =[];
  tableData : MatTableDataSource<BuyerTableViewModel> = new MatTableDataSource<BuyerTableViewModel>([]);
  
 
  async ngOnInit() {
    await this.getAllBuyers();
    this.tableData = new MatTableDataSource(this.buyersList) ;
    
  }
  constructor(
    private services: projectServices,
    private router: Router
  ){}

  mapToTableViewModel(buyers: BuyerAbstractModel[]){
   buyers.forEach(x=> 
    {
      var buyer = new BuyerTableViewModel();
      buyer.id = x.id;
      buyer.createdAt = x.createdAt;
      buyer.buyerName = x.buyer.person.firstName + " " + x.buyer.person?.middleName +" "+ x.buyer.person.lastName;
      // buyer.buyerType = x.buyerType;
      buyer.retailVehicleVin = x.retailVehicle?.vin? x.retailVehicle.vin: "";
      this.buyersList.push(buyer);
    }
    )
  }

  async getAllBuyers(){
    this.buyers = await this.services.getAllBuyers();
    this.mapToTableViewModel(this.buyers);
  }

  async deleteBuyer(id:string, event:Event){
    event.preventDefault();
    const response = await this.services.deleteBuyer(id);
    if(response){
      this.getAllBuyers();
    }else 
    alert("deleted sucessfully");

  }
 async getBuyerById(id:string){
  await this.services.getBuyerById(id);
  
 }

//  sendingData(id:string){
//     let currentData = this.buyers.find((p)=> { return p.id === id}) 
//     const navUrl = '/view';
//     this.router.navigate([navUrl],{queryParams: currentData})
//  }
}


