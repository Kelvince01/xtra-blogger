import { Routes } from '@angular/router';
import { ArticleTitleResolver } from '@main-ui/articles/article-title.resolver';

export const articlesRoutes: Routes = [
  {
    path: 'articles/:id',
    loadComponent: () => import('./article/article.component').then(c => c.ArticleComponent),
    title: ArticleTitleResolver,
  },
  {
    path: '',
    loadComponent: () => import('./articles.component').then(c => c.ArticlesComponent),
    title: `Xtra Blog | Articles`,
  },
];
