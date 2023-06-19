import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(scores: { name: string, score: string }[], searchText: string): { name: string, score: string }[] {
    if (!searchText) {
      return scores;
    }
    searchText = searchText.toLowerCase();
    return scores.filter(score => score.name.toLowerCase().includes(searchText));
  }
}
