import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
  playerForm: FormGroup;
  selectedColors: string = 'normal_colors';

  @Output() public WelcomeToGameEvent = new EventEmitter<boolean>();
  @Output() public playerInfoEvent = new EventEmitter<Player>();
  @Output() public playerDataEvent = new EventEmitter<Array<Player>>();

  public ErrorAlert: boolean = false;

  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._router.navigate(['/welcome']);
    this.playerForm = this._fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      selectedColors: ['normal_colors'],
    });
  }

  public goToColors() {
    this.sendPlayerInfo();
    console.log(this.selectedColors, 'welcome: ' + this.selectedColors);
    if (this.selectedColors === 'normal_colors') {
      this._router.navigate(['/gry', 'normal_colors'], {
        relativeTo: this._route,
      });
    } else {
      this._router.navigate(['/gry', 'high_contrast']);
    }
  }

  ngOnInit(): void {}

  public changeErrorAlert() {
    this.ErrorAlert = false;
  }

  public onSubmitForm() {
    if (this.playerForm.valid) {
      const formValue = this.playerForm.value;
      console.log(formValue);
      this.goToColors();
      this.sendStatus();
      this.sendFormInfo();
      this._storage.setUserData(formValue.Name);
    }
  }
  
  public playerInfo: Player = {
    Name: '',
    Email: '',
  };

  public playerData: Array<Player> = [];
  public changeComps: boolean = true;

  sendStatus() {
    this.changeComps = !this.changeComps;
    this.WelcomeToGameEvent.emit(this.changeComps);
  }

  sendPlayerInfo() {
    this.playerInfoEvent.emit({
      Name: this.playerInfo.Name,
      Email: this.playerInfo.Email,
    });
  }

  sendFormInfo() {
    this._storage.setUserData(this.playerInfo.Name);
  }
}

export interface Player {
  Name: string;
  Email: string;
  pAction?: object;
}
