import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pencilfrontend';
  displayappcomponent = window.frameElement?.id?.includes('iframe')
    ? false
    : true;
}
