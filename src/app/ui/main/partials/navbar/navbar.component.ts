import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@data/services';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ShowIfLoggedInDirective } from '@core/directives';

@Component({
  selector: 'xtra-navbar',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatMenuModule, RouterLinkActive, ShowIfLoggedInDirective],
  template: `
    <nav class="py-4 flex justify-between items-center">
      <!-- Left side of Nav -->
      <div class="flex items-center">
        <img alt="Xtra Blog logo" class="w-1/12 mr-2" src="assets/logos/xtra_blog_logo.png" />
        <span [routerLink]="['']" class="text-2xl font-bold hover:text-gray-500 cursor-pointer">
          Xtra Blog
        </span>
      </div>

      <!-- Right side of nav -->
      <div class="hidden flex-row md:flex">
        <a
          [routerLink]="['']"
          routerLinkActive="router-link-active"
          class="inline-block p-2 font-bold mr-2 hover:text-gray-500">
          Home
        </a>

        <a
          *xtraShowIfLoggedIn="true"
          [routerLink]="['admin']"
          routerLinkActive="router-link-active"
          class="inline-block p-2 font-bold mr-2 hover:text-gray-500">
          Dashboard
        </a>
        <a
          *xtraShowIfLoggedIn="false"
          [routerLink]="['accounts/login']"
          routerLinkActive="router-link-active"
          class="inline-block p-2 font-bold mr-2 hover:text-gray-500">
          Login
        </a>

        <a
          *xtraShowIfLoggedIn="true"
          (click)="onSignOutUserClicked()"
          routerLinkActive="router-link-active"
          class="cursor-pointer mr-2 hover:text-gray-500 border-2 border-black inline-block py-2 px-4 bg-white rounded font-semibold transition ease-in duration-150">
          Log out
        </a>
        <a
          *xtraShowIfLoggedIn="false"
          [routerLink]="['accounts/register']"
          routerLinkActive="router-link-active"
          class="hover:text-gray-500 border-2 border-black inline-block py-2 px-4 bg-white rounded font-semibold transition ease-in duration-150">
          Sign Up
        </a>

        <ng-container *xtraShowIfLoggedIn="true">
          @if (auth.userDataDetails.photoURL) {
            <img
              [src]="auth.userDataDetails.photoURL"
              alt="User"
              class="w-10 h-10 rounded-full border-4 border-[#1F1F1F] cursor-pointer" />
          }
        </ng-container>
      </div>

      <div class="flex flex-row md:hidden">
        <ng-container *xtraShowIfLoggedIn="true">
          @if (auth.userDataDetails.photoURL) {
            <img
              [src]="auth.userDataDetails.photoURL"
              alt="User"
              class="rounded-full border-4 border-[#1F1F1F] cursor-pointer"
              [matMenuTriggerFor]="menu" />
          }
        </ng-container>

        <ng-container *xtraShowIfLoggedIn="false">
          <mat-icon class="cursor-pointer" [matMenuTriggerFor]="menu">menu</mat-icon>
        </ng-container>
      </div>

      <mat-menu #menu="matMenu">
        <button
          mat-menu-item
          [routerLink]="['']"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active">
          Home
        </button>
        <button
          *xtraShowIfLoggedIn="true"
          mat-menu-item
          [routerLink]="['admin']"
          routerLinkActive="active">
          Dashboard
        </button>
        <button
          *xtraShowIfLoggedIn="false"
          mat-menu-item
          [routerLink]="['accounts/login']"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active">
          Login
        </button>
        <button
          *xtraShowIfLoggedIn="false"
          mat-menu-item
          [routerLink]="['accounts/register']"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active">
          Sign up
        </button>
        <button
          *xtraShowIfLoggedIn="true"
          mat-menu-item
          (click)="onSignOutUserClicked()"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active">
          Log out
        </button>
      </mat-menu>
    </nav>
  `,
  styles: [
    `
      button.mat-menu-item:focus {
        outline: none;
      }

      .mat-menu-item .mat-icon {
        color: #1f1f1f;
        font-size: 2em;
      }

      .mat-menu-item {
        display: flex;
        align-items: center;
        font-family: 'Quicksand';
        font-size: 15px;
        font-weight: bolder;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private authService = inject(AuthService);

  auth = this.authService;

  onSignOutUserClicked() {
    this.authService.signOutUser();
  }
}
