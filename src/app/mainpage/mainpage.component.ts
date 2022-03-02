import { HostListener, Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

export interface MessageData {
  fen?: string;
  move?: string;
  checkmate?: boolean;
  target?: string;
  reset?: boolean;
}

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  iframeUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, public dialog: MatDialog) {
    this.iframeUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl('/iframepage');
  }

  @HostListener('window:message', ['$event'])
  handleMessageEvent(event: MessageEvent) {
    if (!event.data.type) {
      const target = event.data.source == 'iframe1' ? 'iframe2' : 'iframe1';
      this.storeToLocal(event.data.fen);
      this.postMessage(target, {
        fen: event.data.fen,
        move: event.data.move,
        checkmate: event.data.check,
        target: target,
      });

      if (event.data.checkmate === true) {
        setTimeout(() => {
          this.openDialog();
        }, 10);
      }
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(MainpageDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        
        this.clearLocal();
        this.postMessage('iframe1', { reset: true });
        this.postMessage('iframe2', { reset: true });
      }
    });
  }
  postMessage(target: string, data: MessageData) {
    const iframe = document?.getElementById(target) as HTMLIFrameElement;
    iframe.contentWindow?.postMessage(data, '*');
  }
  storeToLocal(state: string) {
    console.log(state);
    localStorage.setItem('chessdata', state);
  }

  clearLocal() {
    localStorage.clear();
  }
  ngOnInit(): void {}
}

@Component({
  selector: 'app-mainpage-dialog',
  templateUrl: './mainpage.component-dialog.html',
})
export class MainpageDialogComponent {}
