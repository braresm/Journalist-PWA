import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Archive } from '../../interfaces/archive';
import { Newsroom } from '../../interfaces/newsroom';
import { NewsroomService } from '../../services/newsroom.service';

@Component({
  selector: 'app-news-item-files',
  templateUrl: './news-item-files.component.html',
  styleUrls: ['./news-item-files.component.scss'],
})
export class NewsItemFilesComponent implements OnInit {
  archives$!: Observable<Archive[]>;
  newsroom: Newsroom = this.data.newsroom;

  constructor(
    private dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<NewsItemFilesComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { newsroom: Newsroom },
    private snackbarService: SnackbarService,
    private newsroomService: NewsroomService
  ) {}

  ngOnInit(): void {
    if (this.newsroom.files.length > 0) {
      this.archives$ = this.newsroomService.getNewsroomFiles(this.newsroom);
    } else {
      this.archives$ = of([]);
    }
  }

  onDelete(archive: Archive): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.title = 'Confirm delete file';
    dialogRef.componentInstance.text =
      'Are you sure you want to delete this file?';

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === true) {
        try {
          await this.newsroomService.deleteNewsroomFile(archive.id);
          this.snackbarService.showSuccess('The file has been deleted');
        } catch (err) {
          console.error(err);
          this.snackbarService.showSuccess(
            'An error occurred while deleting the file. Please try again later'
          );
        }
      }
    });
  }
}
