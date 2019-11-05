import { TimeDivision } from './time-division.component';

// simple Family class to help organize the app and provide some amount of type safety in designing future services.
export class Family {
    name: string;
    divisions: TimeDivision[];
}