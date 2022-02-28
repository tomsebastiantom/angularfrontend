import { Component, OnInit,ViewChild } from '@angular/core';
import {NgxChessBoardView} from 'ngx-chess-board';

@Component({
  selector: 'app-iframepage',
  templateUrl: './iframepage.component.html',
  styleUrls: ['./iframepage.component.css']
})

export class IframepageComponent implements OnInit {

  constructor() { 
     if(window.addEventListener){
          window.addEventListener("message", (event) => {
              if(!event.data.type){
                   if(event.data.target==window.frameElement?.id){
                   // this.setMove(event.data.target,event.data.move);
                      this.setFen(event.data.target,event.data.fen);
                    
                     }         
                }
          });
      }
    }

  handlechange(event: any) {
    const fen = this.getFen(window.frameElement?.id);
    const history = this.getHistory(window.frameElement?.id);
    window.parent.postMessage({"fen":fen,"move":history[history.length-1].move,"checkmate":history[history.length-1].check,"source":window.frameElement?.id}, "*");
  
  }
  @ViewChild("board",{static: false}) board: NgxChessBoardView | undefined;
  reset(source:string|undefined):void{
       if(source===window.frameElement?.id){
          console.log(`calling reset window id ${window.frameElement?.id} and source ${source}`)
          this.board?.reset();
        }
    }
  getFen(source:string|undefined):string|undefined{
   let fen:string |undefined="";
     if(source===window.frameElement?.id){
         fen = this.board?.getFEN();
        }
      return fen;
  }

  setFen(target:string|undefined,fen: string):void{
    if(target === window.frameElement?.id){  
        this.board?.setFEN(fen);
     }
  }
  getHistory(source:string|undefined):any|undefined{
    let history:any |undefined="";
      if(source===window.frameElement?.id){
        history = this.board?.getMoveHistory();
         }
       return history;
   }
  setMove(target:string|undefined,move: string):void{

    if(target===window.frameElement?.id){
       
        this.board?.move(move);
     }

    }


  ngOnInit(): void {
  }
  

}
