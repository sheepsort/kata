import { ValueCalculatorService } from './value-calculator.service';

describe('ValueCalculatorService', () => {
  let service: ValueCalculatorService;

  beforeEach(() => {
    service = new ValueCalculatorService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate an EV of 2 when the employer pays $16', () => {
    // arrange
    const hourlyWage = 16;

    // act
    const value = service.OnCalculateValue(hourlyWage);

    // assert
    expect(value).toBe(2);
  });
});
