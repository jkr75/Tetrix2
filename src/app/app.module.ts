import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { GamePageComponentComponent } from './game-page-component/game-page-component.component';
import { WelcomePageComponentComponent } from './welcome-page-component/welcome-page-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorService } from './color.service';
import { PlayerDataService } from './player-data.service';
import { SortPipe } from './sort.pipe';
import { FilterPipe } from './filter.pipe';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponentComponent },
  // { path: 'gry', component: GamePageComponentComponent },
  { path: 'gry/:colors', component: GamePageComponentComponent },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponentComponent,
    WelcomePageComponentComponent,
    SortPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TetrisCoreModule,
    BrowserAnimationsModule,
    ScrollingModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [ColorService, PlayerDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
