import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TableComponent } from "./components/table/table.component";
import { ViewComponent } from "./components/view/view.component";

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