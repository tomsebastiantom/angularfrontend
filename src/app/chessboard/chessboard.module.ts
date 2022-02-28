import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChessBoardModule } from "ngx-chess-board";
import { ChessboardRoutingModule } from './chessboard-routing.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { IframepageComponent } from './iframepage/iframepage.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MainpageDialogComponent} from './mainpage/mainpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainpageComponent,
    IframepageComponent,
    MainpageDialogComponent
  ],
  imports: [
    CommonModule,
    ChessboardRoutingModule,
    NgxChessBoardModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  exports:[
    MainpageComponent,
    IframepageComponent
  
  ]
})
export class ChessboardModule { }
