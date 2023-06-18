
import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TetrisCoreComponent } from 'ngx-tetris';
import { StorageService } from '../storage.service';
import { ColorService } from '../color.service';
import { PlayerDataService } from '../player-data.service';
import { Player } from '../welcome-page-component/welcome-page-component.component';

@Component({
  selector: 'app-game-page-component',
  templateUrl: './game-page-component.component.html',
  styleUrls: ['./game-page-component.component.css'],
})

export class GamePageComponentComponent implements OnInit {
  public selectedColors: string = '';
  playerName: string = '';
  playerScores: { name: string, score: string }[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';

  @Input() playerInfo: Player;
  @Input() playerData: Array<Player>;
  @Output() public GameToWelcomeEvent = new EventEmitter<boolean>();
  @Output() playerFormSubmitted = new EventEmitter<any>();

  @ViewChild(TetrisCoreComponent)

  private tetrix!: TetrisCoreComponent;

  public swapToTitle: boolean = true;
  public pointCount: number = 0;
  public isReady: boolean = true;
  public isGo: boolean = false;
  public isPaused: boolean = false;
  public isGameOver: boolean = false;
  public gameplayTimer: number = 0;
  public Interval: any;
  public gamePlay: boolean = true;
  public showS: boolean = true;
  public gameHistory: Array<pAction> = [];
  public saveCurrentGameData: TotalGameData = {
    playerName: '',
    pointC: 0,
    timeP: 0,
    gameHistory: [],
  }

  public onStartButton() {
    this.tetrix.actionStart();
    this.PushCurrentData("actionStart");
    this.GameStarted();
  }
  public onStopButton() {
    this.tetrix.actionStop();
    this.PushCurrentData("actionStop");
    this.GamePaused();
  }
  public onResetButton() {
    this.tetrix.actionReset();
    this.PushCurrentData("actionReset");
    this.GameReady();
  }
  public onLeftButton() {
    this.tetrix.actionLeft();
    this.PushCurrentData("actionLeft");
  }
  public onRightButton() {
    this.tetrix.actionRight();
    this.PushCurrentData("actionRight");
  }
  public onRotateButton() {
    this.tetrix.actionRotate();
    this.PushCurrentData("actionRotate")
  }
  public onDownButton() {
    this.tetrix.actionDown();
    this.PushCurrentData('actionDown')
  }

  public PushCurrentData(message: string) {
    this.gameHistory.push({
      Time: this.gameplayTimer,
      Action: message
    })
  }

  public saveCurrentGamePlay() {
    this.saveCurrentGameData = {
      playerName: this.playerInfo.Name,
      pointC: this.pointCount,
      timeP: this.gameplayTimer,
      gameHistory: this.gameHistory
    }
    this.gameHistory = []
  }

  sendStatus() {
    this.GameToWelcomeEvent.emit(this.swapToTitle);
    this.stopTimer();
  }
  onFoodEaten() {
    this.pointCount = this.pointCount + 1;
    this.PushCurrentData("Food Eaten")
  }
  // score: number
  onGameOver() {
    this.isGameOver = true;
    this.isPaused = false;
    this.isGo = false;
    this.isReady = false;
    this.stopTimer();
    this.PushCurrentData("Game Over");
    const score = this.pointCount;
    this.submitScore(score);
  }

  GamePaused() {
    this.isGameOver = false;
    this.isPaused = true;
    this.isGo = false;
    this.isReady = false;
    this.stopTimer();
  }

  GameReady() {
    this.isGameOver = false;
    this.isPaused = false;
    this.isReady = true;
    this.isGo = false;
    this.gameplayTimer = 0;
    this.pointCount = 0;
    this.stopTimer();
  }

  GameStarted() {
    this.isGameOver = false;
    this.isPaused = false;
    this.isGo = true;
    this.isReady = false;
    this.startTimer();
  }

  startTimer() {
    this.Interval = setInterval(() => {
      this.gameplayTimer++;
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.Interval);
  }

  public showGameplay() {
    this.showS = true;
    this.saveCurrentGamePlay();
  }
  public hideGameplay() {
    this.showS = false;
    this.saveCurrentGamePlay();
  }

  // public statS() {
  //   this.showS = !this.showS;
  //   this.saveCurrentGamePlay();
  // }

  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _route: ActivatedRoute,
    private _colorService: ColorService,
    private _playerDataService: PlayerDataService,
    private _http: HttpClient,
  ) {
    this.playerInfo = {
      Name: this._storage.readPlayerName(),
      // Email: '',
    }

    this.playerData = [];
  }

  goToColors(selectedColors: string) {
    console.log(this.selectedColors, 'gry: ' + this.selectedColors);
    if (this.selectedColors === 'normal_colors') {
      this._router.navigate(['/gry', 'high_contrast'], {
        relativeTo: this._route
      })
    } else {
      this._router.navigate(['/gry', 'normal_colors'])
    };
  }

  public submitScore(score: number) {
    const authToken = this._storage.getAuthToken();
    const playerName = this._storage.getPlayerName();
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const scoreData = { name: playerName, score: score };

    this._http.post('http://scores.chrum.it/check-token', scoreData, httpOptions)
      .subscribe(
        (response) => {
          console.log('Wynik został zapisany.');
        },
        (error) => {
          console.error('Wystąpił błąd podczas zapisywania wyniku:', error);
        }
      );
  }

  ngOnInit() {
    
    const playerData = this._playerDataService.getPlayerData();
    this.selectedColors = playerData?.selectedColors || 'normal_colors';
    this._route.params.subscribe(params => {
      if (params.hasOwnProperty('colors')) {
        this.selectedColors = params['colors'];
      } else {
        this.selectedColors = 'normal_colors';
      }
      console.log(this.selectedColors);
    });
    // this.goToColors(); 
    setInterval(() => {
      this.fetchPlayerScores();
    }, 30000);
   this.fetchPlayerScores();
  }

  fetchPlayerScores() {
    const authToken = this._storage.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': authToken !== null ? authToken : '' })
    };
  
    this._http.get('http://scores.chrum.it/scores', { ...httpOptions, responseType: 'text' })
      .subscribe(
        (response: any) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(response, 'text/html');
          const tableRows = htmlDocument.querySelectorAll('table tr');
          const playerScores: { name: string, score: string }[] = [];

          tableRows.forEach((row) => {
            const rowData = row.querySelectorAll('td');
            const playerName = rowData[0].textContent;
            const score = rowData[1].textContent;
  
            if (playerName && score) {
              playerScores.push({ name: playerName, score: score });
            }
          });
  
          this.playerScores = playerScores.filter(score => score.name );
          this.sortScores();
          console.log('Player scores:', this.playerScores);
        },
        (error) => {
          console.error('Wystąpił błąd podczas pobierania wyników:', error);
          console.log(error.error);
        }
      );
  }

  sortScores() {
    if (this.sortOrder === 'asc') {
      this.playerScores.sort((a, b) => parseInt(a.score) - parseInt(b.score));
    } else {
      this.playerScores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    }
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortScores();
    console.log('sort ???')
  }
}
  
export interface pAction {
  Time: number;
  Action: string;
}
export interface TotalGameData {
  playerName: string;
  gameHistory: Array<pAction>;
  pointC: number;
  timeP: number;
}
