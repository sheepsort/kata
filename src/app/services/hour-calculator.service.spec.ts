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
    const division: TimeDivision = { start: 27, end: 28, EV: 1.1 };

    // act
    const hours = service.CheckDivision(arrivalTime, departureTime, division);

    // assert
    expect(hours).toBe(0);
  })

  it('should calculate 0 hours if the user arrives after a time division ends', () => {
    // arrange
    const arrivalTime = 22;
    const departureTime = 26;
    const division: TimeDivision = { start: 17, end: 20, EV: 1.0 };

    // act
    const hours = service.CheckDivision(arrivalTime, departureTime, division);

    // assert
    expect(hours).toBe(0);
  })

  it('should calculate 1 hour if the user arrives before the division starts and leaves 1 hour into it', () => {
    // arrange
    const arrivalTime = 22;
    const departureTime = 26;
    const division: TimeDivision = { start: 25, end: 27, EV: 1.0 };

    // act
    const hours = service.CheckDivision(arrivalTime, departureTime, division);

    // assert
    expect(hours).toBe(1);
  })

  it('should calculate 1 hour if the user arrives with one hour remaining in the division', () => {
    // arrange
    const arrivalTime = 22;
    const departureTime = 26;
    const division: TimeDivision = { start: 17, end: 23, EV: 1.0 };

    // act
    const hours = service.CheckDivision(arrivalTime, departureTime, division);

    // assert
    expect(hours).toBe(1);
  })

  it('should calculate 1 hour if the user stays for one hour, and the whole hour is inside the division', () => {
    // arrange
    const arrivalTime = 22;
    const departureTime = 23;
    const division: TimeDivision = { start: 17, end: 26, EV: 1.0 };

    // act
    const hours = service.CheckDivision(arrivalTime, departureTime, division);

    // assert
    expect(hours).toBe(1);
  })

  it('should calculate 1.1 earned hours if the user works 1 hour and the EV is 1.1', () => {
    // arrange
    const hours = 1;
    const division: TimeDivision = { start: 17, end: 26, EV: 1.1 };

    // act
    const earnedHours = service.OnCalculateEV(division, hours);

    // assert
    expect(earnedHours).toBe(1.1);
  })

  it('should calculate 1.1 earned hours if CheckDivision is called with an EV of 1.1', () => {
    // arrange
    const arrivalTime = 22;
    const departureTime = 23;
    const division: TimeDivision = { start: 17, end: 26, EV: 1.1 };

    // act
    const earnedHours = service.CheckDivision(arrivalTime, departureTime, division);

    // assert
    expect(earnedHours).toBe(1.1);
  })
});
