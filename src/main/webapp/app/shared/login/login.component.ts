import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
// import { Console } from 'console';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: './login.component.html',
})
export class LoginModalComponent implements AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false],
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private accountService: AccountService
  ) {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
    this.activeModal.dismiss('cancel');
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          this.activeModal.close();
          if (
            this.router.url === '/account/register' ||
            this.router.url.startsWith('/account/activate') ||
            this.router.url.startsWith('/account/reset/')
          ) {
            this.router.navigate(['']);
          } else {
            // TODO : Saving current user in the local storage
            // localStorage.store('currentUser', user);

            // Navigate from login to home page
            // /!\ ADMIN account has both admin and user authorities, so don't invert these conditions (@baptboleat)
            if (this.accountService.hasAnyAuthority('ROLE_ADMIN') || this.accountService.hasAnyAuthority('ROLE_INSTRUCTOR'))
              this.router.navigate(['/homeInstructor']);
            else this.router.navigate(['/homeStudent']);
          }
        },
        () => (this.authenticationError = true)
      );
  }

  register(): void {
    this.activeModal.dismiss('to state register');
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
    this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/account/reset', 'request']);
  }
}
