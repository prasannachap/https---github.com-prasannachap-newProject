import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TableComponent } from "./table/table.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
   {
    path: 'view/:id',
    component: ViewComponent
   },
   {
   path: '',
   component: TableComponent
   },
   
     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})



export class AppRoutingModule{}