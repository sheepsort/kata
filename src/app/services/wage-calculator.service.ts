import { Injectable } from '@angular/core';
import { Constants } from '../helpers/constants.component';

@Injectable({
  providedIn: 'root'
})
export class WageCalculatorService {
  basePay = new Constants().BASE;
  constructor() { }

  OnCalculateWages(earnedHours: number): number {
    return earnedHours * this.basePay;
  }
}
