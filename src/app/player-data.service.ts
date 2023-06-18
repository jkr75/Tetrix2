import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {

  private playerData: any;
  private hasPlayerData: boolean = false;

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

  sprawdzDaneGracza(): boolean {
    return this.hasPlayerData;
  }

  wyczyscDaneGracza(): void {
    this.hasPlayerData = false;
  }
}

// public showS: boolean = true;