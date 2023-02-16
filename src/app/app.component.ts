import { Component } from '@angular/core';
import { Player } from './welcome-page-component/welcome-page-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tetrix';
  public changeComps: boolean = true
  public playerInfo: Player = {
    Name: '',
    Email: '',
  }
  public playerData: Array<Player> = []
  recieveStatus($event: any) {
    this.changeComps = $event;
  }
  recievePlayerInfo($event: Player) {
    this.playerInfo = $event;
  }

  AddPlayerData($event: Player) {
    this.playerData.push($event)
  }
}