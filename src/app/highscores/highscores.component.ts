import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.scss']
})
export class HighscoresComponent {
  @Input() scores: { name: string, score: string }[] = [];
  searchText: string = '';
  sortOrder: string = 'asc';

  constructor() { }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}

