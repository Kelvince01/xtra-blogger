import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'xtra-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="flex flex-col content-center items-center">
      <div class="flex-1 mb-5 w-9/12 md:w-7/12">
        <p class="text-5xl md:text-8xl font-bold text-center">Easy way to manage your money</p>
      </div>
      <div class="flex-1 w-10/12 md:w-7/12 mb-8">
        <p class="text-xl text-center">
          We help customers more by recommending Xtra Blog. Send & receive money from your friends
          and into your MPESA wallet. You can send money to anyone in the world with just a few
          clicks.
        </p>
      </div>

      <div class="flex flex-row space-x-3 mb-12">
        <button
          [routerLink]="['accounts/register']"
          class="border-2 border-black inline-block py-2 px-4 text-white bg-[#1F1F1F] rounded font-semibold">
          Get Started
        </button>

        <button
          (click)="onApiDocBtnClicked()"
          class="hover:text-gray-500 border-2 border-black inline-block py-2 px-4 bg-white rounded font-semibold">
          API Documentation
        </button>
      </div>

      <div class="flex-1 mb-20">
        <img
          alt="xtra blog landing page image"
          class="w-full"
          src="assets/svgs/landing_transfer.svg" />
      </div>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {
  onApiDocBtnClicked() {
    window.open('https://quikk.dev/index.html', '_blank');
  }
}
