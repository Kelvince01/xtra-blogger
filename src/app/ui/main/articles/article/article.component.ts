import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-article',
  standalone: true,
  imports: [],
  template: `
    <p>
      article works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {

}
