import { Routes } from '@angular/router';
import {CategoryComponent} from "./category/category.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BasicFormComponent} from "./basic-form/basic-form.component";
import {BasicTableComponent} from "./basic-table/basic-table.component";
import {ModalUiComponent} from "./modal-ui/modal-ui.component";
import {BasicUiElementComponent} from "./basic-ui-element/basic-ui-element.component";
import {AuthGuard} from "./auth.guard";
import {MediaComponent} from "./media/media.component";
import {NewsComponent} from "./news/news.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'basic-form', component: BasicFormComponent },
  { path: 'basic-table', component: BasicTableComponent },
  { path: 'modal-ui', component: ModalUiComponent },
  { path: 'basic-ui-element', component: BasicUiElementComponent },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'media', component: MediaComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
