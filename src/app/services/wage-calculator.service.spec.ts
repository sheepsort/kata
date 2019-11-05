import { WageCalculatorService } from './wage-calculator.service';

describe('WageCalculatorService', () => {
  let service: WageCalculatorService;

  beforeEach(() => {
    service = new WageCalculatorService();
  });

  // These dummy tests are auto-populated by Angular and tend to be most useful for ensuring the test's beforeEach is properly setup.
  // I use them often in refactoring old test code that may have error-suppressing schemas or mocked services,
  // many of which ought to include at least one full integration-style test (but don't).
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should compute 80 dollars when ten earned hours are worked', () => {
    // arrange
    const earnedHours = 10;

    // act
    const wages = service.OnCalculateWages(earnedHours);

    // assert
    expect(wages).toBe(80);
  })
});
