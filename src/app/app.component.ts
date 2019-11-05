import { Component, OnInit } from '@angular/core';
import { WageCalculatorService } from './services/wage-calculator.service';
import { HourCalculatorService } from './services/hour-calculator.service';
import { Family } from './models/family.component';
import { Constants } from './helpers/constants.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
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

  // the base pay will be used to calculate the EV of each family.
  // TODO: refactor this to its own service:
  base = new Constants().BASE;

  // Taking advantage of Angular/TS working together to clean up dependency injection:
  constructor(private wageCalc: WageCalculatorService, private hourCalc: HourCalculatorService) {}

  // This OnInit will be UGLY. Normally it would just allow us to subscribe to some subject/observable where we'd set the values
  // of our families and times arrays. Now, however, we need to manually hook that all up.
  ngOnInit() {
    this.families =
      [
        { name: 'Jetson', divisions:
          [
            { start: 17, end: 23, EV: (15/this.base) },
            { start: 23, end: 28, EV: (20/this.base) }
          ] },
        { name: 'Flintstone', divisions:
          [
            { start: 17, end: 22, EV: (12/this.base) },
            { start: 22, end: 24, EV: (8/this.base) },
            { start: 24, end: 28, EV: (16/this.base) } ] },
        { name: 'Seinfeld', divisions:
          [
            { start: 17, end: 21, EV: (21/this.base) },
            { start: 21, end: 28, EV: (15/this.base) }
          ] }
      ];
      this.clockInTimes = [ 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3 ];
      this.clockOutTimes = [ 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4 ];
  }
}
