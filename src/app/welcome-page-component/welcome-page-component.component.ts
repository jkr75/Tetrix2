import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { PlayerDataService } from '../player-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColorService } from '../color.service';

interface FormData {
  Name: string;
  // Email: string;
  Token: string;
}

@Component({
  selector: 'app-welcome-page-component',
  templateUrl: './welcome-page-component.component.html',
  styleUrls: ['./welcome-page-component.component.css'],
})

export class WelcomePageComponentComponent implements OnInit {
  playerForm: FormGroup;
  public selectedColors: string = '';

  @Output() public WelcomeToGameEvent = new EventEmitter<boolean>();
  @Output() public playerInfoEvent = new EventEmitter<Player>();
  @Output() public playerDataEvent = new EventEmitter<Array<Player>>();

  public ErrorAlert: boolean = false;

  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _playerDataService: PlayerDataService,
    private _http: HttpClient,
    private _colorService: ColorService,
  ) {
    this._router.navigate(['/welcome']);
    this.playerForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Token: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4,}$')]),
      selectedColors: new FormControl('normal_colors'),
    });
  }

  public goToColors(selectedColors: string) {
    this._colorService.selectedColors = selectedColors;
    console.log(selectedColors, 'welcome: ' + selectedColors);
    if (selectedColors === 'normal_colors') {
      this._router.navigate(['/gry', 'normal_colors'], {
        relativeTo: this._route,
        queryParams: {
          colors: selectedColors
        }
      });
    } else {
      this._router.navigate(['/gry', 'high_contrast'], {
        relativeTo: this._route,
        queryParams: {
          colors: selectedColors
        }
      });
    }
  }
  
  onEnterPage(): void {
    this._playerDataService.wyczyscDaneGracza()
  }
  
  ngOnInit() {
    this.selectedColors = this._colorService.selectedColors;
    this.playerForm = this._fb.group({
      Name: ['', [Validators.required, Validators.minLength(5)]],
      Token: ['', [Validators.required, Validators.pattern('^[0-9]{4,}$')]],
      selectedColors: ['normal_colors'],
    });
  }

  public changeErrorAlert() {
    this.ErrorAlert = false;
  }

  public onSubmitForm() {
    if (this.playerForm.valid) {
      const formValue = this.playerForm.value;
      const selectedColors = this.playerForm.value.selectedColors;
      this._router.navigate(['/gry', selectedColors]);
      console.log(formValue);
      // this.goToColors()
      this.sendStatus();
      this.sendFormInfo();
      this._storage.setUserData(formValue.Name);
      this._playerDataService.setPlayerData(formValue);
      if (formValue.Token) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        console.log('string token:', formValue.Token)
        this._http.post('http://scores.chrum.it/check-token', { Token: formValue.Token }, httpOptions).subscribe(
          (response) => {
            console.log('Token jest poprawny');
          },
          (error) => {
            console.error('Nieprawidłowy token:', error);
          }
        );
      }
    }
  }


  public playerInfo: Player = {
    Name: '',
    // Emai: '',
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
    });
  }

  sendFormInfo() {
    this._storage.setUserData(this.playerInfo.Name);
  }
}

export interface Player {
  Name: string;
  pAction?: object;
}
