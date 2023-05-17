import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineNewsComponent } from './components/online-news/online-news.component';
import { RadioNewsComponent } from './components/radio-news/radio-news.component';
import { SocialMediaNewsComponent } from './components/social-media-news/social-media-news.component';
import { TvNewsComponent } from './components/tv-news/tv-news.component';
import { NewsroomComponent } from './newsroom.component';

const routes: Routes = [
  {
    path: 'radio',
    component: RadioNewsComponent,
  },
  {
    path: 'tv',
    component: TvNewsComponent,
  },
  {
    path: 'online',
    component: OnlineNewsComponent,
  },
  {
    path: 'social-media',
    component: SocialMediaNewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsroomRoutingModule {}
