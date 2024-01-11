import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
    title: 'Login - Xtra Blog'
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then((c) => c.RegisterComponent),
    title: 'Register - Xtra Blog'
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent),
    title: 'Forgot Password - Xtra Blog'
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then((c) => c.ResetPasswordComponent),
    title: 'Reset Password - Xtra Blog'
  },
  {
    path: 'otp-verify',
    loadComponent: () =>
      import('./otp-verify/otp-verify.component').then((c) => c.OtpVerifyComponent),
    title: 'Otp Verify - Xtra Blog'
  }
];
