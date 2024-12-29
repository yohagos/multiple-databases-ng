import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../core/auth-guard/auth.guard";
import { TicketsComponent } from "./tickets.component";
import { TicketOverviewComponent } from "./ticket-overview/ticket-overview.component";

export const routes: Routes =
  [
    {
      path: '',
      component: TicketsComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'ticket/:id',
          component: TicketOverviewComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'ticket',
          component: TicketOverviewComponent,
          canActivate: [AuthGuard]
        },
      ]
    },
  ]

