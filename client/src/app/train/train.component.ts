import { Component, OnInit } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Subscription } from 'rxjs/Subscription';
import { GlobalDatasService } from '../services/global-datas.service';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {



   language : string ;
   languageSubscription : Subscription;

   //control x axis
   faucetControl : number = 0;
   faucetControlShow : string = '0';
   direction : number = 0;
   animTime : number = 0;

   //waterTap
   waterWidth : number = 0;
   callCount : number = 0;
   repeater : NodeJS.Timer;

   //wrench
   wrenchModeTrain : boolean = false;

   //leaks
   leakPlacesNb : number = 9;
   leakPlaces : number[] = [];
   noLeakAt : boolean[] = [];
   previousNoLeakAt : boolean[] = [];
   leaksReverse : number[] = [];
   leftValues : number[] = [];
   leakCounter : number = 0;

   //water management
   xRobinet : number = 42;
   coeffSpeed : number = 20;
   piValue : number = 3.1415;
   decal : number = 4;
   faucetXAxis : number = 2 * 10 / 40;
   yRobinet : number ;
   coeffXRob : number = 10;
   constXRob : number = 50;
   waterLevelContainer : number = 50;

   //intervals subscribers
   waterManagementSubscriber : Subscription;
   waterFlowSubscriber : Subscription;
   leaksSubscriber : Subscription;

   constructor(private globalDatasService : GlobalDatasService, hotkeysService : HotkeysService) {
   
    //hotkeys
   
    // hotkeysService.add( new Hotkey( [key], (event : KeyboardEvent) : boolean => {
    //   [instructions]
    //   return false;
    // },
    // undefined,
    // 'description ));

    hotkeysService.add( new Hotkey( 's', (event : KeyboardEvent) : boolean => {
      this.faucetCtrlFctMinus();
      return false;
    },
    undefined,
    'tapleft' ));

    hotkeysService.add( new Hotkey( 'd', (event : KeyboardEvent) : boolean => {
      this.faucetCtrlFctPlus();
      return false;
    },
    undefined,
    'tapright' ));

    hotkeysService.add( new Hotkey( 'e', (event : KeyboardEvent) : boolean => {
      this.waterPushButton();
      return false;
    },
    undefined,
    'pushbutton' ));

    hotkeysService.add( new Hotkey( 'a', (event : KeyboardEvent) : boolean => {
      this.wrenchOnOff();
      return false;
    },
    undefined,
    'wrench' ));

  }
 
   ngOnInit() {

    //globalDatas and authentification
     this.languageSubscription = this.globalDatasService.languageSubject.subscribe(
       (language : string) => {
         this.language = language;
       }
     );
     this.globalDatasService.emitLanguageSubject();
     this.globalDatasService.authentify();


    //leaks init
    for (var i=0; i < this.leakPlacesNb; i++) {
      this.leakPlaces.push(this.leakCounter);
      this.leakCounter++;
      this.noLeakAt.push(true);
      this.previousNoLeakAt.push(true);
      this.leftValues.push(0);
      this.leaksReverse.push(0);
    }

    //intervals
    this.waterManagementSubscriber = interval(200).subscribe( () => {
      if((this.xRobinet <= 80) && (this.xRobinet >= 0)) {
        this.xRobinet = this.xRobinet + this.coeffSpeed * (this.piValue / 80) * Math.sin(this.piValue * this.xRobinet / 40 - this.piValue) + this.faucetControl;
      } else if(this.xRobinet > 80) {
        this.xRobinet = 80;
      } else if(this.xRobinet < 0) {
          this.xRobinet = 0;
      }
      //this.xRobinet += this.decal;
      this.faucetXAxis = (this.xRobinet - 40) * 10 / 40;
      this.yRobinet = this.coeffXRob * Math.cos(this.faucetXAxis* this.piValue *2 / 20) + this.constXRob;

    });

    this.waterFlowSubscriber = interval(200).subscribe( () => {
      var leaksSum = 0;
      for(var i = 0; i < this.leakPlacesNb; i++) {
        if(!this.noLeakAt[i]){
          leaksSum = leaksSum + 1;
        }
      }
      if((this.faucetXAxis < 2) && (this.faucetXAxis > -2) && this.waterLevelContainer <= 100) {
        this.waterLevelContainer += this.waterWidth*10/7 - leaksSum/(2*this.leakPlacesNb); 
      } else if (this.waterLevelContainer > 100){
        this.waterLevelContainer -= leaksSum/this.leakPlacesNb;
      }
    });

    this.leaksSubscriber = interval(5000).subscribe( () => {
      if(Math.random() <0.5) {
        var myInt = Math.floor(Math.random()*this.leakPlacesNb);
        this.noLeakAt[myInt] = false;
      }
      for (var i=0 ; i < this.leakPlaces.length ; i++){
        if (!this.noLeakAt[i] && this.previousNoLeakAt[i]){
          if (Math.random()>0.5){
            this.leaksReverse[i] = -1;
          } else{
            this.leaksReverse[i] = 1;
          }
          this.leftValues[i] = Math.random()*30;
          this.previousNoLeakAt[i] = this.noLeakAt[i];
        }
      }
    });

  
     
   }
 
   ngOnDestroy() {
     this.languageSubscription.unsubscribe();
     this.waterManagementSubscriber.unsubscribe();
     this.waterFlowSubscriber.unsubscribe();
     this.leaksSubscriber.unsubscribe();
   }

   faucetCtrlFctMinus(){
    if(this.faucetControl > -3) {
      this.faucetControl--; 
      this.faucetControlShow = this.faucetControl.toString();
    }
    if(this.faucetControl > 0){
        this.faucetControlShow = '+' + this.faucetControl.toString();
        this.direction = 1;
      }
    else if(this.faucetControl < 0){
      this.direction = -1;
    }
    else{
      this.direction = 0;
    }
    this.animTime = 10 - Math.abs(this.faucetControl)*3;
   }

   faucetCtrlFctPlus(){
    if(this.faucetControl < 3) {
      this.faucetControl++; 
      this.faucetControlShow = this.faucetControl.toString();
    }
    if(this.faucetControl > 0){
        this.faucetControlShow = '+' + this.faucetControl.toString();
        this.direction = 1;
      }
    else if(this.faucetControl < 0){
      this.direction = -1;
    }
    else{
      this.direction = 0;
    }
    this.animTime = 7 - Math.abs(this.faucetControl)*2;

   }

   waterPushButton(){
    this.waterWidth = 7/10;
    this.callCount = 1;
    clearInterval(this.repeater);
    this.repeater = setInterval(() => {
      if (this.callCount < 8) {
        this.waterWidth = (7 - this.callCount)/10;
        this.callCount++;
      } else {
        clearInterval(this.repeater);
      }
    }, 1000);
   }

   clickLeak(leakId : number ) {
    if(this.wrenchModeTrain) {
      this.noLeakAt[leakId] = true;
      this.wrenchModeTrain = false;
    }
  };

   wrenchOnOff(){
    this.wrenchModeTrain = !this.wrenchModeTrain;
   }
   
}