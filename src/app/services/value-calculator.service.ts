import { Injectable } from '@angular/core';
import { Constants } from '../helpers/constants.component';

@Injectable({
  providedIn: 'root'
})
export class ValueCalculatorService {
  base = new Constants().BASE;

  constructor() { }

  OnCalculateValue(hourlyWage: number): number {
    return hourlyWage / this.base;
  }
}
