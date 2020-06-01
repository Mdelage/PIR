import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GlobalDatasService } from '../services/global-datas.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  


  @HostListener('document:keydown', ['$event']) onKeydown(event : KeyboardEvent) {
    
    this.keyArray["keyDown" + event.keyCode]();
    /*if(event.keyCode === 38 && !this.upPressed ){
      this.upPressed = true;
      this.downPressed = false;
      this.socketService.sendKey('upDown');
    }else if(event.keyCode === 40 && !this.downPressed){
      this.downPressed = true;
      this.upPressed = false;
      this.socketService.sendKey('downDown');
    }else if(event.keyCode === 37 && !this.leftPressed){
      this.leftPressed = true;
      this.rightPressed = false;
      this.socketService.sendKey('leftDown');
    }else if(event.keyCode === 39 && !this.rightPressed){
      this.rightPressed = true;
      this.leftPressed = false;
      this.socketService.sendKey('rightDown');
    }else if(event.keyCode === 65 && !this.aPressed){
      this.aPressed = true;
      this.socketService.sendKey('a');
    }else if(event.keyCode === 83 && !this.sPressed){
      this.sPressed = true;
      this.socketService.sendKey('s');
    }else if(event.keyCode === 68 && !this.dPressed){
      this.dPressed = true;
      this.socketService.sendKey('d');
    }else if(event.keyCode === 69 && !this.ePressed){
      this.ePressed = true;
      this.socketService.sendKey('e');
    }else if(event.keyCode === 32 && !this.spacePressed){
      this.spacePressed = true;
      this.socketService.sendKey('space');
    }else if(event.keyCode === 87 && !this.onePressed){
      this.onePressed = true;
      this.socketService.sendKey('1');
    }else if(event.keyCode === 88 && !this.twoPressed){
      this.twoPressed = true;
      this.socketService.sendKey('2');
    }else if(event.keyCode === 67 && !this.threePressed){
      this.threePressed = true;
      this.socketService.sendKey('3');
    }else if(event.keyCode === 86 && !this.fourPressed){
      this.fourPressed = true;
      this.socketService.sendKey('4');
    }else if(event.keyCode === 66 && !this.fivePressed){
      this.fivePressed = true;
      this.socketService.sendKey('5');
    }else if(event.keyCode === 78 && !this.sixPressed){
      this.sixPressed = true;
      this.socketService.sendKey('6');
    }else if(event.keyCode === 82 && !this.rPressed){
      this.rPressed = true;
      this.socketService.sendKey('rDown');
    }else if(event.keyCode === 84 && !this.tPressed){
      this.tPressed = true;
      this.socketService.sendKey('tDown');
    }else if(event.keyCode === 70 && !this.fPressed){
      this.fPressed = true;
      this.socketService.sendKey('fDown');
    }else if(event.keyCode === 71 && !this.gPressed){
      this.gPressed = true;
      this.socketService.sendKey('gDown');
    }*/
    
    
  }

  @HostListener('document:keyup', ['$event']) onKeyup(event : KeyboardEvent) {
    
    this.keyArray["keyUp" + event.keyCode]();
    /*if(event.keyCode === 38 && this.upPressed){
      this.upPressed = false;
      this.socketService.sendKey('upUp');
    }else if(event.keyCode === 40 && this.downPressed){
      this.downPressed = false;
      this.socketService.sendKey('downUp');
    }else if(event.keyCode === 37 && this.leftPressed){
      this.leftPressed = false;
      this.socketService.sendKey('leftUp');
    }else if(event.keyCode === 39 && this.rightPressed){
      this.rightPressed = false;
      this.socketService.sendKey('rightUp');
    }else if(event.keyCode === 65){
      this.aPressed = false;    
    }else if(event.keyCode === 83){
      this.sPressed = false;    
    }else if(event.keyCode === 68){
      this.dPressed = false;    
    }else if(event.keyCode === 69){
      this.ePressed = false;    
    }else if(event.keyCode === 32){
      this.spacePressed = false;    
    }else if(event.keyCode === 87){
      this.onePressed = false;    
    }else if(event.keyCode === 88){
      this.twoPressed = false;    
    }else if(event.keyCode === 67){
      this.threePressed = false;    
    }else if(event.keyCode === 86){
      this.fourPressed = false;    
    }else if(event.keyCode === 66){
      this.fivePressed = false;    
    }else if(event.keyCode === 78){
      this.sixPressed = false;    
    }else if(event.keyCode === 82 && this.rPressed){
      this.rPressed = false;
      this.socketService.sendKey('rUp');
    }else if(event.keyCode === 84 && this.tPressed){
      this.tPressed = false;
      this.socketService.sendKey('tUp');
    }else if(event.keyCode === 70 && this.fPressed){
      this.fPressed = false;
      this.socketService.sendKey('fUp');
    }else if(event.keyCode === 71 && this.gPressed){
      this.gPressed = false;
      this.socketService.sendKey('gUp');
    }*/
  }

  @HostListener('window:popstate', ['$event'])  onPopState(event) {
    this.globalDatasService.popState = true;
  }

  

  
  
  language : string;
  wrenchMode : boolean = false;
  alarmOverlayOpen : boolean = false;
  autonomous : boolean = false;
  upPressed : boolean = false;
  downPressed : boolean = false;
  leftPressed : boolean = false;
  rightPressed : boolean = false;
  aPressed : boolean = false;
  sPressed : boolean = false;
  dPressed : boolean = false;
  ePressed : boolean = false;
  onePressed : boolean = false;
  twoPressed : boolean = false;
  threePressed : boolean = false;
  fourPressed : boolean = false;
  fivePressed : boolean = false;
  sixPressed : boolean = false;
  spacePressed : boolean = false;
  rPressed : boolean = false;
  tPressed : boolean = false;
  fPressed : boolean = false;
  gPressed : boolean = false;
  
  propFromTop : number;
  propFromLeft : number;
  rotInRad : number;

  //control x axis
  faucetControl : number = 0;
  faucetControlShow : string = '0';
  direction : number = 0;
  animTime : number = 0;

  //waterTap
  waterWidth : number = 0;
  callCount : number = 0;

 


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

  otherPropFromTop : number;
  otherPropFromLeft : number;
  otherRotInRad : number;

  nbFighted : number = 0;
  remainingTime : number = 600;
  temperature : number = 0;
  hotScreen : number = 0;
  alarmId : number = 0;
  
  role : string ;
  trees : any;
  zones : any = { batteryZone : { x : 0, y : 0},
                  waterZone : { x : 0, y : 0}};

  fires : any;

  watLevel : number = 50;

  waterize : boolean = false;

  messages : any = [];

  inRange : boolean = false;

  personnalScore : number = 0;
  gameOverCause : number = 0;
  newBestScore : boolean = false;
  overlayOpen : boolean = false;

  pseudo1 : string = '';
  pseudo2 : string = '';

  batteryLevel : number = 100;
  treesLocationsSubscription : Subscription;
  zonesLocationsSubscription : Subscription;
  roleSubscription : Subscription;
  gameDataSubscription : Subscription;
  disconnectionSubscription : Subscription;
  waterThrowedSubscription : Subscription;
  messagesSubscription : Subscription;
  alarmsSubscription : Subscription;
  gameOverSubscription : Subscription;
  
  // This associative array is used to send inputs when you're pressing and releasing keys
  keyArray : object = {
    
    // up pushed
    keyDown38 : () => {
      if (!this.upPressed) {
        this.upPressed = true;
        this.downPressed = false;
        this.socketService.sendKey('upDown');
      }
    },
    
    // up released
    keyUp38 : () => {
      if (this.upPressed) {
        this.upPressed = false;
        this.socketService.sendKey('upUp');
      }
    },
    
    // down pushed
    keyDown40 : () => {
      if (!this.downPressed) {
        this.downPressed = true;
        this.upPressed = false;
        this.socketService.sendKey('downDown');
      }
    },
    
    // down released
    keyUp40 : () => {
      if (this.downPressed) {
        this.downPressed = false;
        this.socketService.sendKey('downUp');
      }
    },
    
    // left pushed
    keyDown37 : () => {
      if (!this.leftPressed) {
        this.leftPressed = true;
        this.rightPressed = false;
        this.socketService.sendKey('leftDown');
      }
    },
    
    // left released
    keyUp37 : () => {
      if (this.leftPressed) {
        this.leftPressed = false;
        this.socketService.sendKey('leftUp');
      }
    },
    
    
    // right pushed
    keyDown39 : () => {
      if (!this.rightPressed) {
        this.rightPressed = true;
        this.leftPressed = false;
        this.socketService.sendKey('rightDown');
      }
    },
    
    // right released
    keyUp39 : () => {
      if (this.rightPressed) {
        this.rightPressed = false;
        this.socketService.sendKey('rightUp');
      }
    },
    
    // a pushed
    keyDown65 : () => {
      if (!this.aPressed) {
        this.aPressed = true;
        this.socketService.sendKey('a');
      }
    },
    
    // a released
    keyUp65 : () => {
      this.aPressed = false;
    },
    
    // s pushed
    keyDown83 : () => {
      if (!this.sPressed) {
        this.sPressed = true;
        this.socketService.sendKey('s');
      }
    },
    
    // s released
    keyUp83 : () => {
      this.sPressed = false;
    },
    
    // d pushed
    keyDown68 : () => {
      if (!this.dPressed) {
        this.dPressed = true;
        this.socketService.sendKey('d');
      }
    },
    
    // d released
    keyUp68 : () => {
      this.dPressed = false;
    },
    
    // e pushed
    keyDown69 : () => {
      if (!this.ePressed) {
        this.ePressed = true;
        this.socketService.sendKey('e');
      }
    },
    
    // e released
    keyUp69 : () => {
      this.ePressed = false;
    },
    
    // space pushed
    keyDown32 : () => {
      if (!this.spacePressed) {
        this.spacePressed = true;
        this.socketService.sendKey('space');
      }
    },
    
    // space released
    keyUp32 : () => {
      this.spacePressed = false;
    },
    
    // 1 pushed
    keyDown87 : () => {
      if (!this.onePressed) {
        this.onePressed = true;
        this.socketService.sendKey('1');
      }
    },
    
    // 1 released
    keyUp87 : () => {
      this.onePressed = false;
    },
    
    // 2 pushed
    keyDown88 : () => {
      if (!this.twoPressed) {
        this.twoPressed = true;
        this.socketService.sendKey('2');
      }
    },
    
    // 2 released
    keyUp88 : () => {
      this.twoPressed = false;
    },
    
    // 3 pushed
    keyDown67 : () => {
      if (!this.threePressed) {
        this.threePressed = true;
        this.socketService.sendKey('3');
      }
    },
    
    // 3 released
    keyUp67 : () => {
      this.threePressed = false;
    },
    
    // 4 pushed
    keyDown86 : () => {
      if (!this.fourPressed) {
        this.fourPressed = true;
        this.socketService.sendKey('4');
      }
    },
    
    // 4 released
    keyUp86 : () => {
      this.fourPressed = false;
    },
    
    // 5 pushed
    keyDown66 : () => {
      if (!this.fivePressed) {
        this.fivePressed = true;
        this.socketService.sendKey('5');
      }
    },
    
    // 5 released
    keyUp66 : () => {
      this.fivePressed = false;
    },
    
    // 6 pushed
    keyDown78 : () => {
      if (!this.sixPressed) {
        this.sixPressed = true;
        this.socketService.sendKey('6');
      }
    },
    
    // 6 released
    keyUp78 : () => {
      this.sixPressed = false;
    },
    
    // r pushed
    keyDown82 : () => {
      if (!this.rPressed) {
        this.rPressed = true;
        this.socketService.sendKey('rDown');
      }
    },
    
    // r released
    keyUp82 : () => {
      if (this.rPressed) {
        this.rPressed = false;
        this.socketService.sendKey('rUp');
      }
    },
    
    // t pushed
    keyDown84 : () => {
      if (!this.tPressed) {
        this.tPressed = true;
        this.socketService.sendKey('tDown');
      }
    },
    
    // t released
    keyUp84 : () => {
      if (this.tPressed) {
        this.tPressed = false;
        this.socketService.sendKey('tUp');
      }
    },
    
    // f pushed
    keyDown70 : () => {
      if (!this.fPressed) {
        this.fPressed = true;
        this.socketService.sendKey('fDown');
      }
    },
    
    // f released
    keyUp70 : () => {
      if (this.fPressed) {
        this.fPressed = false;
        this.socketService.sendKey('fUp');
      }
    },
    
    // g pushed
    keyDown71 : () => {
      if (!this.gPressed) {
        this.gPressed = true;
        this.socketService.sendKey('gDown');
      }
    },
    
    // g released
    keyUp71 : () => {
      if (this.gPressed) {
        this.gPressed = false;
        this.socketService.sendKey('gUp');
      }
    }
  }
  

  constructor(private globalDatasService : GlobalDatasService, private socketService : SocketService, private router : Router) { }

  ngOnInit() {

    if(this.globalDatasService.popState){
      window.location.reload();
    }
 
    this.treesLocationsSubscription = this.socketService.onTreesLocations().subscribe((trees) => {
      this.trees = trees;
    });

    this.zonesLocationsSubscription = this.socketService.onZonesLocations().subscribe((zones) => {
      this.zones = zones;
    });

    this.roleSubscription = this.socketService.onRoles().subscribe((role) => {
      this.role = role;
    });

    this.disconnectionSubscription = this.socketService.onDisconnected().subscribe(() => {
      this.router.navigate(['/welcome']);
    });

    this.waterThrowedSubscription = this.socketService.onWaterThrowed().subscribe(() => {
      this.waterize = true;
      setTimeout(() => {
        this.waterize = false;
      }, 100);
    });

    this.alarmsSubscription = this.socketService.onAlarm().subscribe((id) => {
      this.alarmId = id;
      this.alarmOverlayOpen = true;
    });

    this.messagesSubscription = this.socketService.onMessage().subscribe((data) => {
      var messageStr ;
      switch(data.id){
        case 1: {
          if (this.language=='english') {messageStr = "Please refill water tank"}
          else if (this.language=='french') {messageStr = "Remplis le réservoir"};
          break;
        }
        case 2: {
          if (this.language=='english') {messageStr = "I'm going to refuel"}
          else if (this.language=='french') {messageStr = "Je vais recharger"};
          break;
        }
        case 3: {
          if (this.language=='english') {messageStr = "Need water"}
          else if (this.language=='french') {messageStr = "J'ai besoin d'eau"};
          break;
        }
        case 4: {
          if (this.language=='english') {messageStr = "Need electricity"}
          else if (this.language=='french') {messageStr = "J'ai besoin de de batterie"};
          break;
        }
        case 5: {
          messageStr = "Ok";
          break;
        }
        case 6: {
          if (this.language=='english') {messageStr = "No"}
          else if (this.language=='french') {messageStr = "Non"};
          break;
        }
        case 7: {
          if (this.language=='english') {messageStr = "Other player try to give water"}
          else if (this.language=='french') {messageStr = "L'autre joueur veut partager son eau"};
          break;
        }
        case 8: {
          if (this.language=='english') {messageStr = "Other player try to receive water"}
          else if (this.language=='french') {messageStr = "L'autre joueur veut recevoir de l'eau"};
          break;
        }
        case 9: {
          if (this.language=='english') {messageStr = "Other player try to give electricity"}
          else if (this.language=='french') {messageStr = "L'autre joueur veut partager sa batterie"};
          break;
        }
        case 10: {
          if (this.language=='english') {messageStr = "Other player try to receive electricity"}
          else if (this.language=='french') {messageStr = "L'autre joueur veut recevoir de la batterie"};
          break;
        }
        default: {
          break;
        }
      }
      this.messages.push({value : messageStr, status : data.status});
      
    });

    this.gameOverSubscription = this.socketService.onGameOver().subscribe( (data) => {
        this.gameOverCause = data.id;
        this.nbFighted = data.teamScore;
        this.personnalScore = data.personnalScore;
        this.newBestScore = data.newBestScore;
        this.pseudo1 = data.pseudo1;
        this.pseudo2 = data.pseudo2;
        this.overlayOpen = true;
    });
    

    this.gameDataSubscription = this.socketService.onGameData().subscribe((data)=>{
      this.propFromTop = data.pos[1];
      this.propFromLeft = data.pos[0];
      this.rotInRad = data.pos[2];
      this.otherPropFromTop = data.other[1];
      this.otherPropFromLeft = data.other[0];
      this.otherRotInRad = data.other[2];
      let water = data.water; 
     
      this.wrenchMode = water.wrenchMode;
      this.animTime = water.animTime;
      this.direction = water.direction;
      this.xRobinet = water.xRobinet;
      this.yRobinet = water.yRobinet;
      this.waterWidth = water.waterWidth;
      this.faucetXAxis = water.faucetXAxis;
      this.waterLevelContainer = water.waterLevelContainer;
      this.leakPlaces = water.leakPlaces;
      this.noLeakAt = water.noLeakAt;
      this.leaksReverse = water.leaksReverse;
      this.leftValues = water.leftValues;
      this.faucetControl = water.faucetControl;
    
      this.remainingTime = data.remainingTime;
      this.batteryLevel = data.batteryLevel;
    
      this.watLevel = data.waterLevel;
      this.fires = data.fires;
      this.nbFighted = data.teamScore;
      this.personnalScore = data.personnalScore;
      this.temperature = data.temperature;
    
      this.hotScreen = this.temperature/100;
      this.inRange = data.inRange;
      this.autonomous = data.autonomousMode;
    });
  
    this.language = this.globalDatasService.language;

    this.socketService.readyToPlay();
  }

  ngOnDestroy(){
    this.gameDataSubscription.unsubscribe();
    this.treesLocationsSubscription.unsubscribe();
    this.zonesLocationsSubscription.unsubscribe();
    this.roleSubscription.unsubscribe();
    this.disconnectionSubscription.unsubscribe();
    this.messagesSubscription.unsubscribe();
    this.waterThrowedSubscription.unsubscribe();
    this.alarmsSubscription.unsubscribe();
    this.gameOverSubscription.unsubscribe();
  }


  clickLeak(key : number){
    this.socketService.clickLeak(key);
  }

  faucetCtrlFctMinus(){
    this.socketService.sendKey('s');
  }

  faucetCtrlFctPlus(){
    this.socketService.sendKey('d');
  }

  waterPushButton(){
    this.socketService.sendKey('e');
  }

  wrenchOnOff(){
    this.socketService.sendKey('a');
  }

  killAll(){
    this.socketService.killAll();
    this.router.navigate(['/welcome']);
  }

  sendKey(key : string){
    this.socketService.sendKey(key);
  }

  removeAlarm(){
    this.alarmId = 0;
    this.alarmOverlayOpen = false;
    this.socketService.removeAlarm();
  }
}

