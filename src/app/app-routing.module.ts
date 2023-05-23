import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponentComponent } from './welcome-page-component/welcome-page-component.component';
import { GamePageComponentComponent } from './game-page-component/game-page-component.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponentComponent },
  // { path: 'gry', component: GamePageComponentComponent },
  { path: 'gry/:colors', component: GamePageComponentComponent },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes), 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WelcomePageComponentComponent, GamePageComponentComponent]
