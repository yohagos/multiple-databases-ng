import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/auth-guard/auth.guard";
import { DashboardComponent } from "./dashboard.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
]
