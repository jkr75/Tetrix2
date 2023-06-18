import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private playerData: any;
  public showS: boolean = true;

  constructor() {
    this.playerData = {};
  }

  setPlayerData(data: any) {
    this.playerData = data;
  }

  getPlayerData() {
    return this.playerData;
  }
}

// public showS: boolean = true;