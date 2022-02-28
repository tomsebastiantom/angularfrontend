import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import {NgxChessBoardView} from 'ngx-chess-board';

@Component({
  selector: 'app-iframepage',
  templateUrl: './iframepage.component.html',
  styleUrls: ['./iframepage.component.css']
})

export class IframepageComponent implements OnInit {

  constructor() { }
  
@HostListener('window:message', ['$event'])
  handleMessageEvent(event: any) {
       if(!event.data.type){
               this.setFen(event.data.fen);
           if(event.data.reset === true){
         this.reset();
      }         
           }
    }

  handlechange(event: any) {
   
    const fen = this.getFen();
    const history = this.getHistory();
    window.parent.postMessage({"fen":fen,"move":history[history.length-1].move,"checkmate":history[history.length-1].check,"source":window.frameElement?.id}, "*");
  
  }
  @ViewChild("board",{static: false}) board: NgxChessBoardView | undefined;
  reset():void{
      this.board?.reset();        
    }  
  getFen():string|undefined{
       let fen:string |undefined="";
       fen = this.board?.getFEN();
       return fen;
  }  
  setFen(fen: string):void{
     this.board?.setFEN(fen);    
  }
  
  getHistory():any|undefined{
     let history:any |undefined="";
     history = this.board?.getMoveHistory();
     return history;
   }
   
  setMove(move:string):void{
       this.board?.move(move);
     }

  ngOnInit(): void {
  }
  

}
