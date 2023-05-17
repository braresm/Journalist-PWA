import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsroomRoutingModule } from './newsroom-routing.module';
import { NewsroomComponent } from './newsroom.component';
import { TvNewsComponent } from './components/tv-news/tv-news.component';
import { OnlineNewsComponent } from './components/online-news/online-news.component';
import { SocialMediaNewsComponent } from './components/social-media-news/social-media-news.component';
import { RadioNewsComponent } from './components/radio-news/radio-news.component';
import { SharedModule } from '../shared/shared.module';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsItemFilesComponent } from './components/news-item-files/news-item-files.component';

@NgModule({
  declarations: [
    NewsroomComponent,
    TvNewsComponent,
    OnlineNewsComponent,
    SocialMediaNewsComponent,
    RadioNewsComponent,
    NewsItemComponent,
    NewsItemFilesComponent,
  ],
  imports: [CommonModule, NewsroomRoutingModule, SharedModule],
})
export class NewsroomModule {}
