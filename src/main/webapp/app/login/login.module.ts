import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EcomSharedModule } from 'app/shared/shared.module';
import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [EcomSharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [LoginComponent],
})
export class EcomLoginModule {}
