import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ArticlesService } from '@data/services';
import { Article } from '@data/types';

export const ArticleTitleResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  articlesService: ArticlesService = inject(ArticlesService)
): Observable<string> =>
  articlesService.getOne(route.paramMap.get('id') || '').pipe(
    map(({ title }: Article) => title),
    filter<string>((title: string) => !!title),
    map((title: string): string => `Xtra Blog | ${title}`)
  );
