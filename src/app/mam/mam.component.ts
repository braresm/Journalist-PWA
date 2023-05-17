import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../shared/services/file-upload.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { Archive } from './interfaces/archive';
import { ArchiveService } from './services/archive.service';

@Component({
  selector: 'app-mam',
  templateUrl: './mam.component.html',
  styleUrls: ['./mam.component.scss'],
})
export class MamComponent implements OnInit {
  displayedColumns: string[] = [
    'filename',
    'extension',
    'uploadedDate',
    'view',
  ];
  dataSource: Archive[] = [];
  archives$!: Observable<Archive[]>;

  constructor(
    private snackbarService: SnackbarService,
    private archiveService: ArchiveService
  ) {}

  ngOnInit(): void {
    this.archives$ = this.archiveService.getArchives();
    this.archives$.subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error(error);
        this.snackbarService.showError(
          'An error occurred while loading the archives. Please try again later.'
        );
      },
    });
  }
}
