import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { FeedAlert } from '../../enums/feed-alert';
import { Feed } from '../../interfaces/feed';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
})
export class FeedItemComponent implements OnInit {
  @Input() feed!: Feed;

  @Output() deleteFeed = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private feedService: FeedService) {}

  ngOnInit(): void {}

  onAlertOnScreen(): void {
    this.feed.alert = FeedAlert.ONSCREEN;
    this.feedService.update(this.feed);
  }

  onAlertOnEmail(): void {
    this.feed.alert = FeedAlert.EMAIL;
    this.feedService.update(this.feed);
  }

  onRemoveAlert(): void {
    this.feed.alert = null;
    this.feedService.update(this.feed);
  }

  onSendFeedByEmail(): void {
    const toAddress = '';
    const subject = `Feed: ${this.feed.title}`;
    const message = `${this.feed.message}`;
    window.location.href = `mailto:${toAddress}?subject=${subject}&body=${message}`;
  }

  onPrintFeed(): void {
    const printContent = document.getElementById('printFeed');
    const WindowPrt = window.open(
      '',
      '',
      'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0'
    );
    if (WindowPrt && printContent) {
      WindowPrt.document.write(printContent.innerHTML);
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.title = 'Confirm delete feed';
    dialogRef.componentInstance.text =
      'Are you sure you want to delete this feed?';

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteFeed.emit();
      }
    });
  }

  get alertMessage(): string {
    if (!this.feed.alert) {
      return '';
    }

    const alertType = this.feed.alert === FeedAlert.EMAIL ? 'email' : 'screen';
    return `This feed has set an alert on ${alertType}`;
  }
}
