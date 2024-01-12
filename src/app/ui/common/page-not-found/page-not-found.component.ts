import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-page-not-found',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-white py-48">
      <div class="flex flex-col">
        <!-- Error Container -->
        <div class="flex flex-col items-center">
          <div class="text-green-500 font-bold text-7xl">
            404
          </div>

          <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            This page does not exist
          </div>

          <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            The page you are looking for could not be found.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
