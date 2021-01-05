import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';

// My components
// import { HomeStudentComponent } from 'app/homeStudent/homeStudent.component';
// import { HomeInstructorComponent } from 'app/homeInstructor/homeInstructor.component';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const LAYOUT_ROUTES: Routes = [
  navbarRoute,
  ...errorRoute,
  // { path: '/account/homeStudent', component: HomeStudentComponent },
  // { path: '/account/homeInstructor', component: HomeInstructorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: '',
          loadChildren: () => import('./login/login.module').then(m => m.EcomLoginModule),
        },
        {
          path: 'homeStudent',
          loadChildren: () => import('./homeStudent/homeStudent.module').then(m => m.EcomHomeStudentModule),
        },
        {
          path: 'homeInstructor',
          loadChildren: () => import('./homeInstructor/homeInstructor.module').then(m => m.EcomHomeInstructorModule),
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class EcomAppRoutingModule {}
