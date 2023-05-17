import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedSource } from '../../enums/feed-source';
import { FeedStatus } from '../../enums/feed-status';
import { Feed } from '../../interfaces/feed';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.scss'],
})
export class AddFeedComponent implements OnInit {
  title = new FormControl('', [Validators.required]);
  message = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  source = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);
  keywords = new FormControl([''], [Validators.required]);
  image = new FormControl(null);

  addFeedForm = new FormGroup({
    title: this.title,
    message: this.message,
    category: this.category,
    source: this.source,
    status: this.status,
    keywords: this.keywords,
    image: this.image,
  });

  constructor(
    private readonly dialogRef: MatDialogRef<AddFeedComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly feed: Feed
  ) {}

  ngOnInit(): void {}

  onAddFeed(): void {
    this.dialogRef.close({ ...this.feed, ...this.addFeedForm.value });
  }

  removeKeyword(keyword: string) {
    const currentKeywords = this.keywords.value || [];
    const index = currentKeywords.indexOf(keyword);
    if (index >= 0) {
      currentKeywords.splice(index, 1);
    }
    this.addFeedForm.get('keywords')?.setValue(currentKeywords);
  }

  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const currentKeywords: string[] = this.keywords.value || [];

    // Add our keyword
    if (value) {
      currentKeywords.push(value);
    }

    this.addFeedForm.get('keywords')?.setValue(currentKeywords);

    // Clear the input value
    event.chipInput!.clear();
  }

  get feedSources(): string[] {
    const sources = [];
    for (let source in FeedSource) {
      if (isNaN(Number(source))) {
        sources.push(source);
      }
    }
    return sources;
  }

  get feedStatuses(): string[] {
    const statuses = [];
    for (let status in FeedStatus) {
      if (isNaN(Number(status))) {
        statuses.push(status);
      }
    }
    return statuses;
  }
}
