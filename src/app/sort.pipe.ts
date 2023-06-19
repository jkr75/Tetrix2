import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(scores: { name: string, score: string }[], sortOrder: string): { name: string, score: string }[] {
    if (sortOrder === 'asc') {
      return scores.sort((a, b) => parseInt(a.score) - parseInt(b.score));
    } else {
      return scores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    }
  }
}
