import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
  titleService = inject(Title);
  metaService = inject(Meta);
  router = inject(Router);

  public addSeoData(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        let root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data && root.data['title']) {
            this.titleService.setTitle(`${root.data['title']} | Xtra Blog`);
            const tags = root.data['metatags'];
            for (const tag in tags) {
              this.metaService.addTag({ name: tag, content: tags[tag] });
            }
            return;
          } else {
            return;
          }
        }
      });
  }
}
