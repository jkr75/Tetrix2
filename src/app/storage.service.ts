import { HttpClient} from '@angular/common/http';
import { PlayerDataService } from './player-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(
    private _http: HttpClient,
    private _playerData: PlayerDataService,
    ) { }

public _name: string = '';

  public setUserData(Name: string){
    this._name = Name;
  }

  public readPlayerName(){
    return this._name;
  }

  public load(){
    
  }

}
