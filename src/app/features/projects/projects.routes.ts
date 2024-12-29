import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/auth-guard/auth.guard";
import { ProjectsComponent } from "./projects.component";


export const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
]
