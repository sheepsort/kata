import { Injectable } from '@angular/core';
import { TimeDivision } from '../models/time-division.component';
import { Family } from '../models/family.component';

@Injectable({
  providedIn: 'root'
})
export class HourCalculatorService {

  constructor() { }

  OnCalculateHours(arrival: number, departure: number, family: Family): number {
    let totalValue = 0;
    family.divisions.forEach(division => {
      totalValue += this.OnCheckDivision(arrival, departure, division);
    });
    return totalValue;
  }

  /**
   * OnCheckDivision will determine if the user worked during a certain timespan, and give them an appropriate amount of hours as a result.
   * The hours are modified by an EV modifier, which will be used to compute the actual dollars earned.
   * @param arrival When did they punch in?
   * @param departure When did they punch out?
   * @param division Details of the specific tranch to which these hours could apply.
   */
  OnCheckDivision(arrival: number, departure: number, division: TimeDivision): number {
    let value = 0;
    // the time the babysitter left was before this division would have taken place:
    if (departure <= division.start) {
      return value;
      // the time they arrived is after the division would end:
    } else if (arrival >= division.end) {
      return value;
      // they arrived before and departed during this division:
    } else if (arrival < division.start && departure <= division.end) {
      value = departure - division.start;
      // they arrived during and departed after this division:
    } else if (arrival >= division.start && arrival < division.end && departure > division.end) {
      value = division.end - arrival;
      // they arrived before and departed after this division:
    } else if (arrival <= division.start && departure > division.end) {
      value = division.end - division.start;
      // finally, they both arrived and departed within this division:
    } else if (arrival >= division.start && departure <= division.end) {
      value = departure - arrival;
    }

    return this.OnCalculateEV(division, value);
  }

  /**
   * This method will apply a time division's specified rate of expected value to the hours worked during the timespan
   * @param division division whose EV needs to be applied
   * @param hours base number of hours on which to operate
   */
  OnCalculateEV(division: TimeDivision, hours: number): number {
    return division.EV * hours;
  }
}
