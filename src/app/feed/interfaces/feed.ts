import { FeedAlert } from '../enums/feed-alert';
import { FeedSource } from '../enums/feed-source';
import { FeedStatus } from '../enums/feed-status';

export interface Feed {
  id?: string;
  title: string;
  message: string;
  category: string;
  status: FeedStatus;
  source: FeedSource;
  alert: FeedAlert | null;
  keywords: string[];
  imageUrl: string;
  createdDate: any;
}
