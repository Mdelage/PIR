import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { GlobalDatasService } from '../services/global-datas.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket-service';
import { Subscription } from 'rxjs';
import { messages0 } from '../../../../languages';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @HostListener('window:popstate', ['$event'])  onPopState(event) {
    this.globalDatasService.popState = true;
  }

  @Input() pseudo : string = '';
  anotherPlayer : boolean =false;
  language : string;
  waitingTime : number;
  dot : number = 0;
  dotRepeater : NodeJS.Timer;
  isReady : boolean=false;

  launchFailedSubscription : Subscription;
  launchingGameSubscription : Subscription;
  timeBeforeStartSubscription : Subscription;
  
  // messages array
  messageArray : object = messages0;

  constructor(private globalDatasService : GlobalDatasService, private socketService : SocketService, private router : Router) { }

  ngOnInit() {
    if(this.globalDatasService.popState){
      window.location.reload();
    }
    this.language = this.globalDatasService.language;

    this.initDotTimer();

    this.timeBeforeStartSubscription = this.socketService.onTimeBeforeStartResponse().subscribe((waitingTime) => {
        if(!this.anotherPlayer){
          this.anotherPlayer = true;
          clearInterval(this.dotRepeater);
        }
        this.waitingTime = waitingTime;
    });

    this.launchingGameSubscription = this.socketService.onLaunchingGameResponse().subscribe(() => {
        this.router.navigate(['/main']);
    });

    this.launchFailedSubscription = this.socketService.onLaunchFailedResponse().subscribe((waitingAgain) => {
      if(waitingAgain){
        this.anotherPlayer = false;
        this.initDotTimer();
        this.isReady = false;
      }else{
        this.router.navigate(['/welcome']);
      }
    });


  }

  ngOnDestroy() {
    this.timeBeforeStartSubscription.unsubscribe();
    this.launchFailedSubscription.unsubscribe();
    this.launchingGameSubscription.unsubscribe();
    clearInterval(this.dotRepeater);
  }

  ready(){
    this.isReady = true;
    this.socketService.sendReady(this.pseudo);
  }

  initDotTimer(){
    this.dotRepeater = setInterval( () => {
      if(this.dot < 3){
        this.dot +=1;
      }else{
        this.dot = 0;
      }}, 1000);
  }
}
