import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChessboardModule } from './chessboard/chessboard.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChessboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
