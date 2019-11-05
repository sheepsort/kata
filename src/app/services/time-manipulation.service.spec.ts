import { TestBed } from '@angular/core/testing';

import { TimeManipulationService } from './time-manipulation.service';

describe('TimeManipulationService', () => {
  let service: TimeManipulationService;
  beforeEach(() => {
    service = new TimeManipulationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform a "time" number into a pretty string', () => {
    // arrange
    const time = 17;

    // act
    const timeString = service.OnMakeFriendlyTime(time);

    // assert
    expect(timeString).toBe('5:00PM');
  })

  it('should convert a "time" string of 5:00PM from user form submission back to 17', () => {
    // arrange
    const timeString = "5:00PM";

    // act
    const time = service.OnHandleTimecard(timeString);

    // assert
    expect(time).toBe(17);
  })

  // I expect it to be 25 here so the math is simpler in the existing services.
  // One good refactor would be adding type safety to the time values using a tool like the DateTime pipe in Angular, or MomentJS.
  it('should convert a "time" string of 1:00AM to 25', () => {
    // arrange
    const timeString = "1:00AM";

    // act
    const time = service.OnHandleTimecard(timeString);

    // assert
    expect(time).toBe(25);
  })
});
