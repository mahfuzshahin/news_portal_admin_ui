import { Routes } from '@angular/router';
import {CategoryComponent} from "./category/category.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BasicFormComponent} from "./basic-form/basic-form.component";
import {BasicTableComponent} from "./basic-table/basic-table.component";
import {ModalUiComponent} from "./modal-ui/modal-ui.component";
import {BasicUiElementComponent} from "./basic-ui-element/basic-ui-element.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-form', component: BasicFormComponent },
  { path: 'basic-table', component: BasicTableComponent },
  { path: 'modal-ui', component: ModalUiComponent },
  { path: 'basic-ui-element', component: BasicUiElementComponent },
  { path: '', component: LoginComponent }
];
