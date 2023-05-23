import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { Player } from '../welcome-page-component/welcome-page-component.component';
import { TetrisCoreComponent } from 'ngx-tetris';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from '../color.service';
import { PlayerDataService } from '../player-data.service';

@Component({
  selector: 'app-game-page-component',
  templateUrl: './game-page-component.component.html',
  styleUrls: ['./game-page-component.component.css'],
})
export class GamePageComponentComponent implements OnInit {
  public selectedColors: string = '';
  playerData: any;

  @Input() playerInfo: Player;
  @Output() public GameToWelcomeEvent = new EventEmitter<boolean>();

  @ViewChild(TetrisCoreComponent)
  private tetris!: TetrisCoreComponent;

  public showS: boolean = true;
  public swapToTitle: boolean = true;
  public pointCount: number = 0;
  public isReady: boolean = true;
  public isGo: boolean = false;
  public isPaused: boolean = false;
  public isGameOver: boolean = false;
  public gameplayTimer: number = 0;
  public Interval: any;
  public gameHistory: Array<pAction> = [];
  public saveCurrentGameData: TotalGameData = {
    playerName: '',
    pointC: 0,
    timeP: 0,
    gameHistory: [],
  };

  public onStartButton() {
    this.tetris.actionStart();
    this.PushCurrentData('actionStart');
    this.GameStarted();
  }

  public onStopButton() {
    this.tetris.actionStop();
    this.PushCurrentData('actionStop');
    this.GamePaused();
  }

  public onResetButton() {
    this.tetris.actionReset();
    this.PushCurrentData('actionReset');
    this.GameReady();
  }

  public onLeftButton() {
    this.tetris.actionLeft();
    this.PushCurrentData('actionLeft');
  }

  public onRightButton() {
    this.tetris.actionRight();
    this.PushCurrentData('actionRight');
  }

  public onRotateButton() {
    this.tetris.actionRotate();
    this.PushCurrentData('actionRotate');
  }

  public onDownButton() {
    this.tetris.actionDown();
    this.PushCurrentData('actionDown');
  }

  public PushCurrentData(message: string) {
    this.gameHistory.push({
      Time: this.gameplayTimer,
      Action: message,
    });
  }

  public saveCurrentGamePlay() {
    this.saveCurrentGameData = {
      playerName: this.playerInfo.Name,
      pointC: this.pointCount,
      timeP: this.gameplayTimer,
      gameHistory: this.gameHistory,
    };
    this.gameHistory = [];
  }

  sendStatus() {
    this.GameToWelcomeEvent.emit(this.swapToTitle);
    this.stopTimer();
  }

  onFoodEaten() {
    this.pointCount = this.pointCount + 1;
    this.PushCurrentData('Food Eaten');
  }

  onGameOver() {
    this.isGameOver = true;
    this.isPaused = false;
    this.isGo = false;
    this.isReady = false;
    this.stopTimer();
    this.PushCurrentData('Game Over');
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
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.Interval);
  }

  public statS() {
    this.saveCurrentGamePlay();
  }

  constructor(
    private router: Router,
    private _storage: StorageService,
    private _route: ActivatedRoute,
    private colorService: ColorService,
    private _playerDataService: PlayerDataService
  ) {
    this.playerInfo = {
      Name: this._storage.readPlayerName(),
      Email: '',
    };

    this.playerData = [];
  }

  goToColors(selectedColors: string) {
    console.log(this.selectedColors, 'gry: ' + this.selectedColors);
    if (this.selectedColors === 'normal_colors') {
      this.router.navigate(['/gry', 'high_contrast'], {
        relativeTo: this._route,
      });
    } else {
      this.router.navigate(['/gry', 'normal_colors']);
    }
  }

  ngOnInit() {
    const playerData = this._playerDataService.getPlayerData();
    this.selectedColors = playerData?.selectedColors || 'normal_colors';
    this._route.params.subscribe((params) => {
      if (params.hasOwnProperty('colors')) {
        this.selectedColors = params['colors'];
      } else {
        this.selectedColors = 'normal_colors';
      }
      console.log(this.selectedColors);
    });
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
