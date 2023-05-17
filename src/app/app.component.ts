import { Component } from '@angular/core';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'journalist-app';

  constructor(private pwaService: PwaService) {
    this.pwaService.initPwaInstallPrompt();
  }

  onPwaInstall(): void {
    this.pwaService.installPwa();
  }

  isInstallBtnVisible(): boolean {
    return this.pwaService.btnVisible;
  }
}
