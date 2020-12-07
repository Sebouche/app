import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LocalStorageService } from 'ngx-webstorage';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Student } from 'app/shared/model/student.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './homeStudent.component.html',
  styleUrls: ['homeStudent.scss'],
})
export class HomeStudentComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  constructor(private accountService: AccountService, private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // TODO : return current Instructor from local strorage
  getCurrentInstructor(): Student | null {
    // return localStorage.getItem('currentUser');
    return null;
  }
}
