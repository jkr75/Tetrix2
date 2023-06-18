import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlayerDataService } from './player-data.service';

@Injectable({
    providedIn: 'root'
  })
  export class PlayerDataGuard implements CanActivate {
  
    constructor(private _playerDataService: PlayerDataService, private router: Router) { }
  
    canActivate(): boolean {
      const hasPlayerData = this._playerDataService.getPlayerData() !== null;
      if (hasPlayerData) {
        return true;
      } else {
        this.router.navigate(['/welcome']);
        return false;
      }
    }
  }