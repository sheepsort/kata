import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WageCalculatorService {

  constructor() { }
  
  OnCalculateWages(earnedHours: number): number {
    return earnedHours * 8;
  }
}
