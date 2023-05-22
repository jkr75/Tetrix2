import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';

interface FormData {
  Name: string;
  Email: string;
}

@Component({
  selector: 'app-welcome-page-component',
  templateUrl: './welcome-page-component.component.html',
  styleUrls: ['./welcome-page-component.component.css'],
})

export class WelcomePageComponentComponent implements OnInit {

  @Output() public WelcomeToGameEvent = new EventEmitter<boolean>();
  @Output() public playerInfoEvent = new EventEmitter<Player>();
  @Output() public palyerDataEvent = new EventEmitter<Array<Player>>();

  public ErrorAlert: boolean = false;

  constructor(private _router: Router, private _storage: StorageService, private _route: ActivatedRoute) {
    this._router.navigate(['/welcome']);

  }

  public selectedColors: string = '';

  goToColors() {
    this.sendPlayerInfo();
    console.log(this.selectedColors)
    this._router.navigate(['/gry', this.selectedColors], {
      relativeTo: this._route
    });
  }

  ngOnInit(): void {
  }

  public changeErrorAlert() {
    this.ErrorAlert = false;
  }

  public onSubmitForm() {
    this.goToColors();
    this.sendStatus();
    this.sendFormInfo();
  }

  public onSubmit(formValue: FormData) {
    this._storage.setUserData(formValue.Name);
    // this._router.navigate(['/gry'])
  }

  public playerInfo: Player = {
    Name: '',
    Email: ''
  }

  public playerData: Array<Player> = []
  public changeComps: boolean = true;

  sendStatus() {
    this.changeComps = !this.changeComps,
      this.WelcomeToGameEvent.emit(this.changeComps)
  }

  sendPlayerInfo() {
    this.playerInfoEvent.emit({
      Name: this.playerInfo.Name,
      Email: this.playerInfo.Email,
    })

  }
  sendFormInfo() {
    this._storage.setUserData(this.playerInfo.Name)
  }
}

export interface Player {
  Name: string,
  Email: string,
  pAction?: object,
}
