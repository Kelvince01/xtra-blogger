import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@data/services';
import { GlobalService } from '@shared/services';

@Component({
  selector: 'xtra-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="flex flex-col lg:flex-row p-2 w-full mt-8">
      <div class="w-full lg:w-1/2 flex items-center content-center justify-center">
        <img src="assets/svgs/login.svg" alt="Log In" class="w-9/12" />
      </div>

      <div
        class="w-full my-10 lg:my-0 lg:w-1/2 flex flex-col items-center justify-center content-center">
        <form
          [formGroup]="this.authService.loginForm"
          class="flex flex-col md:w-2/4"
          (ngSubmit)="loginUser()">
          <label class="text-xl font-semibold mb-3">Email address</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            formControlName="email"
            class="border-2 border-gray-500 w-full rounded py-3 px-4 outline-none focus:bg-indigo-100 focus:transition ease-in duration-150 mb-3" />

          <label class="text-xl font-semibold mb-3">Password</label>
          <input
            type="password"
            placeholder="************"
            formControlName="password"
            class="border-2 border-gray-500 w-full rounded py-3 px-4 outline-none focus:bg-indigo-100 focus:transition ease-in duration-150 mb-8" />

          @if (errorMsg) {
            <small class="text-red-500 font-bold mb-3">{{ errorMsg }}</small>
          }

          <div class="flex flex-col justify-between space-y-6">
            <button
              type="submit"
              class="inline-block py-2 px-6 text-white bg-[#1F1F1F] rounded font-semibold
        transition ease-in duration-150">
              LOGIN
            </button>

            <!-- Google Auth -->
            <div
              (click)="onGoogleSignInClicked()"
              class="bg-gray-100 rounded h-12 p-4 text-black flex flex-row items-center justify-center content-center cursor-pointer">
              <!-- Google Icon -->
              <div class="icon-box">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.58279 12.2063C7.16765 10.4368 8.29637 8.89726 9.80794 7.80725C11.3195 6.71723 13.1367 6.13242 15.0003 6.13625C17.1128 6.13625 19.0228 6.88625 20.5228 8.11375L24.8878 3.75C22.2278 1.43125 18.819 0 15.0003 0C9.08779 0 3.99779 3.3725 1.55029 8.3125L6.58279 12.2063Z"
                    fill="#EA4335" />
                  <path
                    d="M20.0501 22.5162C18.6876 23.395 16.9576 23.8637 15.0001 23.8637C13.144 23.8675 11.3336 23.2874 9.82543 22.2054C8.31722 21.1234 7.18756 19.5945 6.59639 17.835L1.54639 21.6687C2.78544 24.1766 4.70297 26.2867 7.08116 27.7594C9.45936 29.2321 12.2029 30.0083 15.0001 30C18.6664 30 22.1689 28.6962 24.7926 26.25L20.0514 22.5162H20.0501Z"
                    fill="#34A853" />
                  <path
                    d="M24.7925 26.25C27.5362 23.69 29.3175 19.88 29.3175 15C29.3175 14.1125 29.1812 13.1587 28.9775 12.2725H15V18.0687H23.045C22.6488 20.0175 21.5825 21.5262 20.0513 22.5162L24.7925 26.25Z"
                    fill="#4A90E2" />
                  <path
                    d="M6.5964 17.835C6.29059 16.9211 6.13523 15.9637 6.1364 15C6.1364 14.0225 6.29264 13.0838 6.58265 12.2063L1.55015 8.3125C0.520618 10.3909 -0.0100999 12.6806 0.000145568 15C0.000145568 17.4 0.556396 19.6625 1.5464 21.6688L6.5964 17.835Z"
                    fill="#FBBC05" />
                </svg>
              </div>
              <span class="ml-3 font-semibold">CONTINUE WITH GOOGLE</span>
            </div>
          </div>
        </form>

        <p class="text-center text-gray-500 text-xs mt-2">
          &copy;{{ provideFullYear }} Xtra Blog. All rights reserved.
        </p>
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  errorMsg: string = '';

  formBuilder = inject(FormBuilder);
  globalService = inject(GlobalService);
  authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  get provideFullYear(): number {
    const date: Date = new Date();
    return date.getFullYear();
  }

  loginUser(): void {
    this.authService.loginUser().catch((error) => this.globalService.showSnackbar(error.message));
  }

  onGoogleSignInClicked(): void {
    this.authService.googleLogin().catch((error) => {
      this.globalService.showSnackbar(error.message);
    });
  }
}
