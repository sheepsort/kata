import { TestBed, async, ComponentFixture } from '@angular/core/testing';
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

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  /**
   * This is the big acceptance test toward which the code in app.ts and app.html will work.
   * It will serve as a means of mimicking user interaction with a fully-rendered DOM, to ensure
   * every service and Angular interaction is set up properly.
   * There isn't a compelling reason to test Angular itself, but my use of its toolings should be accounted for.
   */
  // TODO: this code will end up being modified as I work forward; I don't anticipate names of IDs to persist through creation of the view.
  // TODO: that's why it's going to keep the 'x' prefix for the foreseeable future!
  it('should output a message to the user indicating they earned $88.00 when they work for the Flintstones from 8pm to 3am', async(() => {
    // arrange
    fixture.detectChanges();
    // act
    const family = fixture.debugElement.query(By.css('select[id="family"]'));
    family.nativeElement.click();
    fixture.detectChanges();

    const flintstone = fixture.debugElement.queryAll(By.css('option')).filter(x => x.nativeElement.value === 'Flintstone')[0];
    flintstone.nativeElement.click();
    fixture.detectChanges();

    const clockIn = fixture.debugElement.query(By.css('select[id="arrival"]'));
    clockIn.nativeElement.click();
    fixture.detectChanges();

    // There are two dropdowns with a value of 8:00pm as an option; we want to select the first one:
    const punchIn = fixture.debugElement.queryAll(By.css('option')).filter(x => x.nativeElement.value === '8:00PM')[0];
    punchIn.nativeElement.click();
    fixture.detectChanges();

    const clockOut = fixture.debugElement.query(By.css('select[id="departure"]'));
    clockOut.nativeElement.click();
    fixture.detectChanges();

    // There are two dropdowns with a value of 3:00am as an option; we want to select the second one:
    const punchOut = fixture.debugElement.queryAll(By.css('option')).filter(x => x.nativeElement.value === '3:00AM')[1];
    punchOut.nativeElement.click();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('submit'));
    submitButton.nativeElement.click();
    fixture.detectChanges();

    const result = fixture.debugElement.query(By.css('p'));
    // assert
    expect(result.nativeElement.textContent).toMatch(/You have earned \$88.00 tonight!/);
  }));

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
