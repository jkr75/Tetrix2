import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  public _name: string = '';

  constructor(private _http: HttpClient) { }

  public setUserData(Name: string){
    this._name = Name;
  }

  public readPlayerName(){
    return this._name;
  }

}
