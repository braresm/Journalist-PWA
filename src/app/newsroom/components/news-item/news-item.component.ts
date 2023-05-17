import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { UploadFileDialogComponent } from 'src/app/shared/components/upload-file-dialog/upload-file-dialog.component';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { NewsroomCategory } from '../../enums/newsroom-category';
import { Newsroom } from '../../interfaces/newsroom';
import { NewsroomService } from '../../services/newsroom.service';
import { NewsItemFilesComponent } from '../news-item-files/news-item-files.component';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() item!: Newsroom;

  @Output() deleteNews = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private newsroomService: NewsroomService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  onUploadFile(): void {
    const uploadFileDialogRef = this.dialog.open(UploadFileDialogComponent, {
      width: '600px',
      data: {
        acceptExtensions: this.getAcceptedExtensions(),
      },
    });

    uploadFileDialogRef.afterClosed().subscribe(async (data) => {
      const uploadResult = await this.fileUploadService.uploadFile(
        this.item.category,
        data.file
      );

      this.item.files.push(uploadResult.documentId);
      this.newsroomService.update(this.item);

      this.snackbarService.showSuccess('The file has been uploaded');
    });
  }

  onViewFiles(): void {
    const newsItemFilesDialogRef = this.dialog.open(NewsItemFilesComponent, {
      width: '600px',
      data: {
        newsroom: this.item,
      },
      autoFocus: false,
    });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.title = 'Confirm delete news';
    dialogRef.componentInstance.text =
      'Are you sure you want to delete this news?';

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteNews.emit();
      }
    });
  }

  private getAcceptedExtensions(): string {
    if (
      this.item.category === NewsroomCategory.RADIO ||
      this.item.category === NewsroomCategory.TV
    ) {
      return '.mp4,.mp3,.txt';
    }

    if (
      this.item.category === NewsroomCategory.ONLINE ||
      this.item.category === NewsroomCategory.SOCIAL_MEDIA
    ) {
      return '.txt';
    }

    return '';
  }
}
