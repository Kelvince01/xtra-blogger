import { Routes } from '@angular/router';
import { ArticleTitleResolver } from '@main-ui/articles/article-title.resolver';
import MainComponent from '@main-ui/main.component';

export default [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.component'),
        title: 'Home - Xtra Blog',
        data: {
          title: 'Home',
          revalidate: 60,
          metatags: {
            description: 'Page Description or some content here',
            keywords: 'some, keywords, here, separated, by, a comma'
          }
        }
      },
      {
        path: 'about',
        loadComponent: () => import('./about/about.component').then((c) => c.AboutComponent),
        title: 'Kelvince Phillips - Software Developer | About Us',
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then((c) => c.ContactComponent),
        title: 'Contact Us - Xtra Blog'
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./privacy-policy/privacy-policy.component').then((c) => c.PrivacyPolicyComponent),
        title: 'Privacy Policy - Xtra Blog'
      },
      {
        path: 'terms-of-service',
        loadComponent: () =>
          import('./terms-of-service/terms-of-service.component').then(
            (c) => c.TermsOfServiceComponent
          ),
        title: 'Terms of Service - Xtra Blog'
      },
      {
        path: 'articles',
        loadComponent: () => import('./articles/articles.component'),
        title: `Xtra Blog | Articles`,
      },
      {
        path: 'articles/:id',
        loadComponent: () => import('./articles/article/article.component').then(c => c.ArticleComponent),
        title: ArticleTitleResolver,
      }
    ]
  }
] as Routes;
