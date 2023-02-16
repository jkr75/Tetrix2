import { Component, Output, EventEmitter } from '@angular/core';

interface FormData {
  Name: string;
  Email: string;
}

@Component({
  selector: 'app-welcome-page-component',
  templateUrl: './welcome-page-component.component.html',
  styleUrls: ['./welcome-page-component.component.css']
})
export class WelcomePageComponentComponent {
  @Output() public WelcomeToGameEvent = new EventEmitter<boolean>();
  @Output() public playerInfoEvent = new EventEmitter<Player>();
  @Output() public palyerDataEvent = new EventEmitter<Array<Player>>();

  public onSubmit(data: FormData) {
    console.log(data)
  }

  public playerInfo: Player = {
    Name: '',
    Email: ''
  }

  public playerData: Array<Player> = []
  public changeComps: boolean = true;

  constructor() { }

  sendStatus() {
    this.changeComps = !this.changeComps,
      this.WelcomeToGameEvent.emit(this.changeComps)
  }

  sendPlayerInfo() {
    this.playerInfoEvent.emit({
      Name: this.playerInfo.Name,
      Email: this.playerInfo.Email
    })
  }
}
export interface Player {
  Name: string,
  Email: string,
  pAction?: object,
}
