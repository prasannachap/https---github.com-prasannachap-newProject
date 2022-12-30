import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BuyerAbstractModel } from '../../models/buyer.model';
import { BuyerTableViewModel } from '../../models/viewModel/buyerViewModel.model';
import { projectServices } from '../../services/records.services';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [projectServices],
})
export class TableComponent implements OnInit {
  buyers: BuyerAbstractModel[] = [];
  displayedColumns: string[] = ['id', 'createdAt', 'buyer', 'retail', 'action'];
  buyersList: BuyerTableViewModel[] = [];
  tableData: MatTableDataSource<BuyerTableViewModel> = new MatTableDataSource<BuyerTableViewModel>([]);
  loading = false;
  constructor(
    private services: projectServices,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }


  async ngOnInit() {
    debugger;
    this.getAllBuyers();
  }

  mapToTableViewModel(buyers: BuyerAbstractModel[]) {
    this.buyersList = [];
    debugger;
    buyers.forEach((x) => {
      var buyer = new BuyerTableViewModel();
      buyer.id = x.id;
      buyer.createdAt = x.createdAt;
      buyer.buyerName = x.buyer.person.firstName +' ' + x.buyer.person.middleName + ' ' +x.buyer.person.lastName;
      // buyer.buyerType = x.buyerType;
      buyer.retailVehicleVin = x.retailVehicle?.vin ? x.retailVehicle.vin : '';
      this.buyersList.push(buyer);
    });
    this.tableData = new MatTableDataSource(this.buyersList);
    debugger;
  }

  async getAllBuyers() {
    this.buyers = await this.services.getAllBuyers();
    debugger;
    this.mapToTableViewModel(this.buyers);
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  async deleteBuyer(id: string, event: Event) {
    this.loading = true;
    try {
      event.preventDefault();
      const response = await this.services.deleteBuyer(id);
      debugger;
      if (response) {
        this.notificationService.warn('Data Deleted Successfully!!!')
      }
      this.loading = false;
      this.getAllBuyers();
    }

    catch (error) {
      alert(error);
    }
  }

  async getBuyerById(id: string) {
    this.loading =true;
    await this.services.getBuyerById(id);
    this.loading = false;
  }
}
