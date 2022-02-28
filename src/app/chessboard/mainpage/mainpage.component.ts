import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  iframeUrl:SafeResourceUrl;
  
  constructor(private sanitizer: DomSanitizer,public dialog: MatDialog) { 

  this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("/iframepage");
   


  if(window.addEventListener){
     window.addEventListener("message", (event) => {
        if(!event.data.type){
           const target = event.data.source=="iframe1"?"iframe2":"iframe1";
           const  iframe = document?.getElementById(target) as HTMLIFrameElement;  
           iframe.contentWindow?.postMessage({"fen":event.data.fen,"move":event.data.move,"checkmate":event.data.check,"target":iframe.id}, "*");
           if(event.data.checkmate === true){
               setTimeout(()=>{ this.openDialog() }, 10);
               }
           }
      });
  
  }

  
  }

  openDialog(){
    console.log("open dialog");
    const dialogRef = this.dialog.open(MainpageDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };
 
  
ngOnInit(): void {
}



}
  
@Component({
  selector: 'app-mainpage-dialog',
  templateUrl: './mainpage.component-dialog.html',
})
export class MainpageDialogComponent{}





