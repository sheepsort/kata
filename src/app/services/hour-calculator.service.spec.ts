import { HourCalculatorService } from './hour-calculator.service';
import { TimeDivision } from '../models/time-division.component';

describe('HourCalculatorService', () => {
  let service: HourCalculatorService;

  beforeEach(() => {
    service = new HourCalculatorService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate 0 hours if the user leaves before a time division begins', () => {
    // arrange
    const arrivalTime = 22;
    const departureTime = 26;
    const division: TimeDivision = { start: 27, end: 28, EV: 1.1 }

    // act
    const hours = service.CheckDivision(arrivalTime, departureTime, division);

    // assert
    expect(hours).toBe(0);
  })
});
