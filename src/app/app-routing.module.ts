import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableComponent } from "./components/table/table.component";
import { ViewComponent } from "./components/view/view.component";
import { AddUserComponent } from "./components/add-user/add-user.component";

const routes: Routes = [
    {
        path: 'view/:id',
        component: ViewComponent,
        pathMatch: 'full'
    },
   {
   path: '',
   component: TableComponent
   },
   {
    path: 'addUser',
    component: AddUserComponent
   }
   
     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})



export class AppRoutingModule{}