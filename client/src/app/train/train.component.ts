import { Component, OnInit, OnDestroy } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Subscription } from 'rxjs/Subscription';
import { GlobalDatasService } from '../services/global-datas.service';
import { interval } from 'rxjs/observable/interval';
import { messages } from '../../../../languages';
import {
  gameTime,
  water
} from '../../../../settings';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit, OnDestroy {

  language : string ;
  messageArray : object = messages;

  /* For selecting which controls to display
  0 : Robot Control
  1 : Water Tank
  2 : Cooperation */
  controlDisplay : number = 0;
  selected : string[] = ["selected", "", ""];
  
  // Those methods change the controls to display
  changeDisp (x: number) {
    this.selected[this.controlDisplay] = "";
    
    this.controlDisplay = x;
    this.selected[x] = "selected";
    
    this.wrenchModeTrain = false;
  }
   
   //control x axis
   faucetSpeed : number = 0;
   faucetSpeedShow : string = '0';
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
   xRobinet : number = water.xRobinet;
   coeffSpeed : number = water.coeffSpeed;
   piValue : number = water.piValue;
   decal : number = water.decal;
   faucetXAxis : number = water.faucetXAxis;
   yRobinet : number = water.yRobinet;
   coeffXRob : number = water.coeffXRob;
   constXRob : number = water.constXRob;
   waterLevelContainer : number = water.waterLevelContainer;
  
  faucetMaxSpeed : number = water.faucetMaxSpeed;
  faucetAcceleration : number = water.faucetAcceleration;
  faucetDecceleration : number = water.faucetDecceleration;
  

   //intervals subscribers
   waterManagementSubscriber : Subscription;
   waterFlowSubscriber : Subscription;
   leaksSubscriber : Subscription;

   constructor(private globalDatasService : GlobalDatasService, private hotkeysService : HotkeysService) {
   
    //hotkeys
   
    // hotkeysService.add( new Hotkey( [key], (event : KeyboardEvent) : boolean => {
    //   [instructions]
    //   return false;
    // },
    // undefined,
    // 'description ));

    this.hotkeysService.add( new Hotkey( 's', (event : KeyboardEvent) : boolean => {
      this.faucetCtrlFctMinus();
      return false;
    },
    undefined,
    'tapleft' ));

    this.hotkeysService.add( new Hotkey( 'd', (event : KeyboardEvent) : boolean => {
      this.faucetCtrlFctPlus();
      return false;
    },
    undefined,
    'tapright' ));

    this.hotkeysService.add( new Hotkey( 'e', (event : KeyboardEvent) : boolean => {
      this.waterPushButton();
      return false;
    },
    undefined,
    'pushbutton' ));

    this.hotkeysService.add( new Hotkey( 'a', (event : KeyboardEvent) : boolean => {
      this.wrenchOnOff();
      return false;
    },
    undefined,
    'wrench' ));

  }
 
   ngOnInit() {
     

    //globalDatas and authentification
     this.language = this.globalDatasService.language;


    //leaks init
    var i;
    var l = this.leakPlacesNb;
     
    for (i=0; i < l; i++) {
      this.leakPlaces.push(this.leakCounter);
      this.leakCounter++;
      this.noLeakAt.push(true);
      this.previousNoLeakAt.push(true);
      this.leftValues.push(0);
      this.leaksReverse.push(0);
    }

    //intervals
    this.waterManagementSubscriber = interval(200).subscribe( () => {
      var x;
      var y = this.piValue;
      var sign = "  ";

      // Rounds to the first digit
      this.faucetSpeed = this.roundNumber(this.faucetSpeed, 1); 

      // The speed which will be displayed
      x = this.faucetSpeed;
      if (x > 0) { sign = "+ "} else if (x < 0) { sign = "- " }; 
      this.faucetSpeedShow = sign + Math.abs(x).toFixed(1);

      /* Decreasing of the speed.
      When it's negative, we add the decceleration.
      When it's positive, we substract the decceleration. */
      this.faucetSpeed -= Math.sign(this.faucetSpeed) * this.faucetDecceleration;

      this.xRobinet += this.coeffSpeed * (y / 80) * Math.sin(y * this.xRobinet / 40 - y) + this.faucetSpeed;
      //Keeps xRobinet between 0 and 80
      this.xRobinet = Math.min(Math.max(this.xRobinet, 0), 80);

      //this.xRobinet += this.decal;
      this.faucetXAxis = (this.xRobinet - 40) * 10 / 40;
      this.yRobinet = this.coeffXRob * Math.cos(this.faucetXAxis* y *2 / 20) + this.constXRob;


      // Old way
      /*if((this.xRobinet <= 80) && (this.xRobinet >= 0)) {
        this.xRobinet = this.xRobinet + this.coeffSpeed * (this.piValue / 80) * Math.sin(this.piValue * this.xRobinet / 40 - this.piValue) + this.faucetControl;
      } else if(this.xRobinet > 80) {
        this.xRobinet = 80;
      } else if(this.xRobinet < 0) {
          this.xRobinet = 0;
      }
      //this.xRobinet += this.decal;
      this.faucetXAxis = (this.xRobinet - 40) * 10 / 40;
      this.yRobinet = this.coeffXRob * Math.cos(this.faucetXAxis* this.piValue *2 / 20) + this.constXRob;*/

    });

    this.waterFlowSubscriber = interval(200).subscribe( () => {
      var leaksSum = 0;
      for(var i = 0; i < this.leakPlacesNb; i++) {
        if(!this.noLeakAt[i]){
          leaksSum = leaksSum + 1;
        }
      }
      if(this.waterLevelContainer <= 100){
        this.waterLevelContainer -= leaksSum/(2*this.leakPlacesNb);
        if((this.faucetXAxis < 2) && (this.faucetXAxis > -2)){
          this.waterLevelContainer += this.waterWidth*10/7;
        }
      }
      else{
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
     this.waterManagementSubscriber.unsubscribe();
     this.waterFlowSubscriber.unsubscribe();
     this.leaksSubscriber.unsubscribe();
   }
  
  //This function rounds to a given amount of digits a number x
  roundNumber (x, digits) {
    var tens = 10 * digits;
    return Math.round((x + Number.EPSILON) * tens) / tens;
  };

  faucetCtrlFctMinus(){
    var x = this.faucetSpeed;
  
    this.faucetSpeed = Math.max(
      -this.faucetMaxSpeed,
      this.roundNumber(x - this.faucetAcceleration, 1)
    );
    this.direction = Math.sign(x);
    this.animTime = 10 - Math.abs(x)*3;
  
    // Old way
    /*
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
    this.animTime = 10 - Math.abs(this.faucetControl)*3; */
   }

  faucetCtrlFctPlus(){
    var x = this.faucetSpeed;
  
    this.faucetSpeed = Math.min(
      this.faucetMaxSpeed,
      this.roundNumber(x + this.faucetAcceleration, 1)
    ); 
  
    this.direction = Math.sign(x);
    this.animTime = 10 - Math.abs(x)*3;
     
     
    // Old way
     /*if(this.faucetControl < 3) {
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
    */
     
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

   wrenchOnOff() {
    // We only change the wrench if the water tank control are displayed
    if (this.controlDisplay == 1) {
      this.wrenchModeTrain = !this.wrenchModeTrain;
    }
   }
   
}