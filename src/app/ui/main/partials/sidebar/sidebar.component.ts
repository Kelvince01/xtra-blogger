import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-sidebar',
  standalone: true,
  imports: [],
  template: `
    <p>
      sidebar works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

}
