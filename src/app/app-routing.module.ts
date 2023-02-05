import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutComponent } from './features/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'drugs',
        loadChildren: () => import('./features/drugs/drugs.module').then(m => m.DrugsModule)
      },
      // {
      //   path: 'users',
      //   loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
      // },
      {
        path: 'drug-usages',
        loadChildren: () => import('./features/drug-usages/drug-usages.module').then(m => m.DrugUsagesModule)
      },
    ]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: 'labs', loadChildren: () => import('./features/labs/labs.module').then(m => m.LabsModule) },

  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
