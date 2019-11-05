import { Injectable } from '@angular/core';
import { TimeDivision } from '../models/time-division.component';

@Injectable({
  providedIn: 'root'
})
export class HourCalculatorService {

  constructor() { }

  CheckDivision(arrival: number, departure: number, division: TimeDivision): number {
    let value = 0;
    if (departure <= division.start) {
      return value;
    } else if (arrival >= division.end) {
      return value;
    } else if (arrival < division.start && departure <= division.end) {
      value = departure - division.start;
    } else if (arrival < division.end && departure >= division.end) {
      value = division.end - arrival;
    } else if (arrival >= division.start && departure <= division.end) {
      value = departure - arrival;
    }

    return value;
  }
}
