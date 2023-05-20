import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { GamePageComponentComponent } from './game-page-component/game-page-component.component';
import { WelcomePageComponentComponent } from './welcome-page-component/welcome-page-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponentComponent },
  { path: 'gry', component: GamePageComponentComponent },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponentComponent,
    WelcomePageComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TetrisCoreModule,
    BrowserAnimationsModule,
    ScrollingModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
