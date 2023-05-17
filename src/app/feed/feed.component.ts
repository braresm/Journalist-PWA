import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  filter,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { FileUploadService } from '../shared/services/file-upload.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { AddFeedComponent } from './components/add-feed/add-feed.component';
import { Feed } from './interfaces/feed';
import { FeedFilter } from './interfaces/feed-filter';
import { FeedService } from './services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private destroyed$ = new Subject<void>();
  feeds$!: Observable<Feed[]>;

  keywords = new FormControl(['']);
  alert = new FormControl('');

  filterFeedsForm = new FormGroup({
    keywords: this.keywords,
    alert: this.alert,
  });

  constructor(
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private fileUploadService: FileUploadService,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
    this.feeds$ = this.feedService.getFeeds();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  onApplyFilters(): void {
    const feedFilter: FeedFilter = {
      keywords: this.keywords.value || [],
      alert: this.alert.value || '',
    };
    this.feeds$ = this.feedService.getFeedsWithFilters(feedFilter);
  }

  onResetFilters(): void {
    this.filterFeedsForm.reset();
    this.feeds$ = this.feedService.getFeeds();
  }

  removeKeyword(keyword: string) {
    const currentKeywords = this.keywords.value || [];
    const index = currentKeywords.indexOf(keyword);
    if (index >= 0) {
      currentKeywords.splice(index, 1);
    }
    this.filterFeedsForm.get('keywords')?.setValue(currentKeywords);
  }

  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const currentKeywords: string[] = this.keywords.value || [];

    // Add our keyword
    if (value) {
      currentKeywords.push(value);
    }

    this.filterFeedsForm.get('keywords')?.setValue(currentKeywords);

    // Clear the input value
    event.chipInput!.clear();
  }

  onAddFeedItem(): void {
    const addFeedDialogRef = this.dialog.open(AddFeedComponent, {
      width: '600px',
    });

    addFeedDialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(async (feedData) => {
          const uploadResult = await this.fileUploadService.uploadFile(
            'feeds',
            feedData.image
          );
          const feed: Feed = {
            title: feedData.title,
            message: feedData.message,
            category: feedData.category,
            source: feedData.source,
            status: feedData.status,
            alert: null,
            keywords: feedData.keywords,
            imageUrl: uploadResult.downloadUrl,
            createdDate: null,
          };
          this.snackbarService.showSuccess('Feed has been created');
          this.feedService.create(feed);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  onDeleteFeed(feed: Feed): void {
    if (feed.id) {
      this.feedService.delete(feed.id);
      this.snackbarService.showSuccess('Feed has been deleted');
    }
  }
}
