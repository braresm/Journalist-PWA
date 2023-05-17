import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { FeedRoutingModule } from './feed-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { FeedComponent } from './feed.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { AddFeedComponent } from './components/add-feed/add-feed.component';

@NgModule({
  declarations: [FeedComponent, FeedItemComponent, AddFeedComponent],
  imports: [CommonModule, FeedRoutingModule, SharedModule],
})
export class FeedModule {}
