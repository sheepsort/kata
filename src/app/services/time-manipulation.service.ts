import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeManipulationService {

  constructor() { }

  OnMakeFriendlyTime(time: number): string {
    if (time > 12) {
      time -= 12;
      return `${time}:00PM`;
    } else if (time > 0) {
      return `${time}:00AM`;
    } else {
      return `12:00AM`;
    }
  }
}
