import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: any;
  btnVisible = false;

  constructor() {}

  initPwaInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.promptEvent = event;
      this.btnVisible = true;
    });
  }

  public installPwa() {
    this.btnVisible = true;
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA app installed');
      } else {
        console.log('PWA app not installed');
      }
      this.promptEvent = null;
    });
  }
}
