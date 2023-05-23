import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private playerData: any;

  setPlayerData(data: any) {
    this.playerData = data;
  }

  getPlayerData() {
    return this.playerData;
  }
}
