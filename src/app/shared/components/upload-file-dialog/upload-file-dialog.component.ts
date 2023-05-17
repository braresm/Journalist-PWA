import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss'],
})
export class UploadFileDialogComponent implements OnInit {
  file = new FormControl(null, [Validators.required]);

  uploadFileForm = new FormGroup({
    file: this.file,
  });

  extensions: string = this.data.acceptExtensions;

  constructor(
    private readonly dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: { acceptExtensions: string }
  ) {}

  ngOnInit(): void {}

  onUploadFile(): void {
    this.dialogRef.close({ ...this.uploadFileForm.value });
  }
}
