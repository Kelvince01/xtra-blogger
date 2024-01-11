import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '@common-ui/page-not-found/page-not-found.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import MainComponent from "@main-ui/main.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['../accounts/login']);

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () => import('./ui/main/main.component'),
    // component: MainComponent,
    loadChildren: () => import('./ui/main/main.routes')
  },
  {
    path: 'accounts',
    // loadComponent: () => import('./ui/auth/auth.component').then((c) => c.AuthComponent),
    loadChildren: () => import('./ui/auth/auth.routes').then((r) => r.AuthRoutes)
  },
  // {
  //   path: 'admin',
  //   loadComponent: () => import('./ui/admin/admin.component').then((c) => c.AdminComponent),
  //   loadChildren: () => import('./ui/admin/admin.routes').then((r) => r.AdminRoutes),
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  // },
  { path: '**', component: PageNotFoundComponent }
];
