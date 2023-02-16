import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { FormsModule} from '@angular/forms';
import { GamePageComponentComponent } from './game-page-component/game-page-component.component';
import { WelcomePageComponentComponent } from './welcome-page-component/welcome-page-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
  declarations: [AppComponent, GamePageComponentComponent, WelcomePageComponentComponent],
  imports: [ BrowserModule, FormsModule, TetrisCoreModule, BrowserAnimationsModule, ScrollingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


