import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  selectedColors: string = 'normal_colors';

  constructor() { }
}