import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  /**
   * Normally, I would write one large acceptance test at the top of this file.
   * After discussing with a couple people who have completed katas, I decided that would be beyond the scope of what I'd like to focus on.
   * The unit tests are what drove the production of this application, and although the acceptance criteria provided direction,
   * that test is not the correct goal for this project.
   */

  it('should call OnSubmit when the form is submitted', () => {
    fixture.detectChanges();
    spyOn(comp, 'OnSubmit');

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(comp.OnSubmit).toHaveBeenCalled();
  });

  it('should properly format a number to a time string with the time manipulation service', () => {
    // arrange
    const time = 17;

    // act
    const timeString = comp.MakePrettyTime(time);

    // assert
    expect(timeString).toBe('5:00PM');
  });

  it('should create an error message if the arrival time is after the departure time', () => {
    // arrange
    fixture.detectChanges();
    comp.arrival = '3:00AM';
    comp.departure = '11:00PM';
    comp.families = [ { name: 'Huxtable', divisions: [ { start: 17, end: 25, EV: 1 } ] } ];
    comp.family = 'Huxtable';

    // act
    comp.OnSubmit();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('p'));

    // assert
    expect(error.nativeElement.textContent).toMatch(/Please select a departure time that is later than your arrival./);
  });

  it('should call OnSubmit when the button is clicked', () => {
    // arrange
    spyOn(comp, 'OnSubmit');
    const submitButton = fixture.debugElement.query(By.css('button'));

    // act
    submitButton.nativeElement.click();

    // assert
    expect(comp.OnSubmit).toHaveBeenCalled();
  });

});
