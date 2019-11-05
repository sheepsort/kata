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
});
