import { Component, EventEmitter, Input, Output, ViewChild, OnInit, Injectable } from '@angular/core';
import { Player } from '../welcome-page-component/welcome-page-component.component';
import { TetrisCoreComponent } from 'ngx-tetris';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from '../color.service';

@Component({
  selector: 'app-game-page-component',
  templateUrl: './game-page-component.component.html',
  styleUrls: ['./game-page-component.component.css'],
})

@Injectable()
export class GamePageComponentComponent implements OnInit {

  @Input() playerInfo: Player;
  @Input() playerData: Array<Player>;
  @Output() public GameToWelcomeEvent = new EventEmitter<boolean>();

  @ViewChild(TetrisCoreComponent)

  private tetrix!: TetrisCoreComponent;
  public swapToTitle: boolean = true;
  public pointCount: number = 0
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
  onGameOver() {
    this.isGameOver = true;
    this.isPaused = false;
    this.isGo = false;
    this.isReady = false;
    this.stopTimer();
    this.PushCurrentData("Game Over");
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

  public statS() {
    this.showS = !this.showS;
    this.saveCurrentGamePlay();
  }

  public selectedColors: string = '';

  constructor(
    private router: Router, 
    private _storage: StorageService, 
    private _route: ActivatedRoute, 
    private colorService: ColorService
    ) {
    this.selectedColors = colorService.selectedColors;
    this.playerInfo = {
      Name: this._storage.readPlayerName(),
      Email: '',
    }

    this.playerData = [];
  }
 
  goToColors(selectedColors: string) {
    this.colorService.selectedColors = this.selectedColors;
    console.log(this.selectedColors, 'gry: ' + this.selectedColors)
    if (selectedColors === 'normal_colors') {
      this.router.navigate(['/gry', 'high_contrast'], {
        relativeTo: this._route
      })
    } else {
      this.router.navigate(['/gry', 'normal_colors'])
    };
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
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