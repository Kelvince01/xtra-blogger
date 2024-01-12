import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-articles',
  standalone: true,
  imports: [],
  template: `
    <p>articles works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {}
