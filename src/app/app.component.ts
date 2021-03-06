import { Component, OnInit } from '@angular/core';
import { WageCalculatorService } from './services/wage-calculator.service';
import { HourCalculatorService } from './services/hour-calculator.service';
import { Family } from './models/family.component';
import { TimeManipulationService } from './services/time-manipulation.service';
import { ValueCalculatorService } from './services/value-calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // mocking dummy data for this component. In real life, these values would come from an exposed API, and be managed through service calls.
  // Outlining them in the app typescript beefs up the file a lot, but is necessary to keep this lightweight.

  // families is the array of families that will be rendered to the DOM with a simple *ngFor directive.
  families: Family[];
  // in and out times are arrays of numbers that will populate the dropdowns in the view.
  clockInTimes: number[] = [];
  clockOutTimes: number[] = [];
  // wages will hold the total amount the user earned that ends up displayed in the view.
  wages: number;
  // show result is a flag that will enable the DOM to render feedback to the user.
  showResult: boolean;

  // simple error rendering flag:
  timeError = false;

  // form values to be bound:
  arrival: string;
  departure: string;
  family: string;

  // Taking advantage of Angular/TS working together to clean up dependency injection:
  constructor(
    private wageCalc: WageCalculatorService,
    private hourCalc: HourCalculatorService,
    private timeServ: TimeManipulationService,
    private valueCalc: ValueCalculatorService) {}

  // This OnInit will be UGLY. Normally it would just allow us to subscribe to some subject/observable where we'd set the values
  // of our families and times arrays. Now, however, we need to manually hook that all up.
  ngOnInit() {
    this.families =
      [
        { name: 'Jetson', divisions:
          [
            { start: 17, end: 23, EV: this.valueCalc.OnCalculateValue(15) },
            { start: 23, end: 28, EV: this.valueCalc.OnCalculateValue(20) }
          ] },
        { name: 'Flintstone', divisions:
          [
            { start: 17, end: 22, EV: this.valueCalc.OnCalculateValue(12) },
            { start: 22, end: 24, EV: this.valueCalc.OnCalculateValue(8) },
            { start: 24, end: 28, EV: this.valueCalc.OnCalculateValue(16) } ] },
        { name: 'Seinfeld', divisions:
          [
            { start: 17, end: 21, EV: this.valueCalc.OnCalculateValue(21) },
            { start: 21, end: 28, EV: this.valueCalc.OnCalculateValue(15) }
          ] }
      ];
    this.clockInTimes = [ 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3 ];
    this.clockOutTimes = [ 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4 ];
  }

  MakePrettyTime(time: number): string {
    return this.timeServ.OnMakeFriendlyTime(time);
  }

  OnTimecardComplete(arrival: number, departure: number, family: Family): number {
    return this.hourCalc.OnCalculateHours(arrival, departure, family);
  }

  OnGenerateWages(hours: number): number {
    return this.wageCalc.OnCalculateWages(hours);
  }

  OnNumberifyTimes(timeString: string): number {
    return this.timeServ.OnHandleTimecard(timeString);
  }

  OnSubmit(): void {
    // reset the form values:
    this.wages = 0;
    this.showResult = false;
    // modify the user input to easy-to-use numbers:
    const arrivalTime = this.OnNumberifyTimes(this.arrival);
    const departureTime = this.OnNumberifyTimes(this.departure);
    if (arrivalTime >= departureTime) {
      this.timeError = true;
    } else {
      // search the families array for the family that matches the user's selection
      // IRL this would be handled with unique IDs, not last names that could collide:
      const chosenFamily = this.families.filter(x => x.name === this.family)[0];

      // calculate the Earned Hours value to generate wages:
      const earnedHours = this.OnTimecardComplete(arrivalTime, departureTime, chosenFamily);

      // set our wage value to a newly computed total and flag our form as complete to show the result:
      this.wages = this.OnGenerateWages(earnedHours);
      this.showResult = true;
      this.timeError = false;
    }
  }
}
