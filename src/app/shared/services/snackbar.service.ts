import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  // snackbar duration in milliseconds (5s)
  private readonly DURATION = 5000;

  private readonly INFO = 'info-snackbar';
  private readonly SUCCESS = 'success-snackbar';
  private readonly WARNING = 'warn-snackbar';
  private readonly ERROR = 'error-snackbar';

  constructor(private snackBar: MatSnackBar) {}

  showInfo(message: string) {
    this.showSnackbar(message, this.INFO);
  }
  showSuccess(message: string) {
    this.showSnackbar(message, this.SUCCESS);
  }
  showWarning(message: string) {
    this.showSnackbar(message, this.WARNING);
  }
  showError(message: string) {
    this.showSnackbar(message, this.ERROR);
  }

  showUpdateAvailable(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.showUpdateAvailableSnackbar(message, action);
  }

  private showSnackbar(message: string, panelClass: string) {
    const config = new MatSnackBarConfig();
    config.duration = this.DURATION;
    config.panelClass = panelClass;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'bottom';
    this.snackBar.open(message, '', config);
  }

  private showUpdateAvailableSnackbar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    const config = new MatSnackBarConfig();
    config.duration = undefined;
    config.panelClass = this.INFO;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'bottom';
    return this.snackBar.open(message, action, config);
  }
}
