import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';


import io from 'socket.io-client';


@Injectable()
export class SocketService {
    private socket : io;
    public token : number = -1;

    public initSocket() : void {
        if(this.token = -1){
            this.socket = io("http://localhost:3000");
        }    
    }

    public send(message : string, data : any) : void {
        this.socket.emit(message, data);
    }

    public getToken() : void {
        this.socket.emit("getToken");
    }

    public getRemainingTime() : void {
        this.socket.emit("getRemainingTime");
    }

    public getPlay() : void {
        this.socket.emit("getPlay", { token : this.token });
    }

    public sendReady(pseudo : string) : void {
        this.socket.emit("ready", { token : this.token, pseudo : pseudo });
    }

    public readyToPlay() : void {
        this.socket.emit("readyToPlay", { token : this.token});
    }

    public killAll() : void {
        this.socket.emit("killAll", { token : this.token});
    }

    public getScores() : void {
        this.socket.emit("getScores", {});
    }
    //keys

    public clickLeak(key : number){
        this.socket.emit("clickLeak", {key : key, token : this.token});
    }

    public sendKey(key : string){
        this.socket.emit("key", { key: key, token : this.token});
    }


    public onTokenResponse(): Observable<any>{
        return new Observable<any>( observer => {
            this.socket.on('tokenResponse' , (data) => {observer.next(data.token);
            });
        });
    }


    public onRemainingTimeResponse() : Observable<any>{
        return new Observable<any>( observer => {
            this.socket.on('remainingTimeResponse' , (data) => {observer.next(data.remainingTime);
            });
        });
    }

    public onPlayResponse(){
        return new Observable<any>( observer => {
            this.socket.on('accessAuthorized' , () => {observer.next('authorized')});
            this.socket.on('accessDenied' , (data) => {observer.next(data.remainingTime)});
        });
    }

    public onTimeBeforeStartResponse(){
        return new Observable<any>( observer => {
            this.socket.on('timeBeforeStart', (data) => {observer.next(data.timeBeforeStart);});
        });
    }

    public onLaunchingGameResponse(){
        return new Observable<any>( observer => {
            this.socket.on('launchingGame', () => {observer.next();});
        });
    }

    public onLaunchFailedResponse(){
        return new Observable<any>( observer => {
            this.socket.on('launchFailed', (data) => {observer.next(data.waitingAgain);});
        });
    }

    public onGameData(){
        return new Observable<any>( observer => {
            this.socket.on('gameData', (data) => {observer.next(data);});
        });
    }

    public onTreesLocations(){
        return new Observable<any>( observer => {
            this.socket.on('trees', (data) => {observer.next(data.trees);});
        }); 
    }

    public onZonesLocations(){
        return new Observable<any>( observer => {
            this.socket.on('zones', (data) => {observer.next(data.zones);});
        }); 
    }

    public onRoles(){
        return new Observable<any>( observer => {
            this.socket.on('role', (data) => {observer.next(data.role);});
        }); 
    }

    public onDisconnected(){
        return new Observable<any>( observer => {
            this.socket.on('disconnected', (data) => {observer.next();});
        }); 
    }

    public onWaterThrowed(){
        return new Observable<any>( observer => {
            this.socket.on('waterThrowed', (data) => {observer.next();});
        });       
    }

    public onMessage(){
        return new Observable<any>( observer => {
            this.socket.on('message', (data) => {observer.next(data);});
        });  
    }

    public onAlarm(){
        return new Observable<any>( observer => {
            this.socket.on('alarm', (data) => {observer.next(data.id);});
        }); 
    }

    public onGameOver(){
        return new Observable<any>( observer => {
            this.socket.on('gameOver', (data) => {observer.next(data);});
        }); 
    }

    public onScores(){
        return new Observable<any>( observer => {
            this.socket.on('scores', (data) => {observer.next(data.scores);});
        }); 
    }

    public removeAlarm(){
        this.socket.emit("removeAlarm", {token : this.token});
    }
}