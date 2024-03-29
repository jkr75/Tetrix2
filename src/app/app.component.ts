import { Component, OnInit } from '@angular/core';
import { Player } from './welcome-page-component/welcome-page-component.component';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StorageService]
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
  ) {
    this._router.navigate(['/welcome']);
  }

  title = 'Tetrix';

  public changeComps: boolean = true;
  public playerInfo: Player = {
    Name: '',
    // Email: '',
  };
  public playerData: Array<Player> = [];

  receiveStatus($event: any) {
    this.changeComps = $event;
  }

  receivePlayerInfo($event: Player) {
    this.playerInfo = $event;
  }

  addPlayerData($event: Player) {
    this.playerData.push($event);
  }

  ngOnInit(): void {
  }
}
