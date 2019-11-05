import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Family } from './models/family.component';

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
  //TODO: this code will end up being modified as I work forward; I don't anticipate names of IDs to persist through my creation of the view.
  //TODO: that's why it's going to keep the 'x' prefix for the foreseeable future!
  xit('should output a message to the user indicating they earned $88.00 when they work for the Flintstones from 8pm to 3am', () => {
    // arrange
    // act
    const family = fixture.debugElement.query(By.css('select[id="family"]'));
    family.nativeElement.click();
    fixture.detectChanges();

    const flintstone = fixture.debugElement.queryAll(By.css('option')).filter(x => x.nativeElement.value == 'Flintstone')[0];
    flintstone.nativeElement.click();
    fixture.detectChanges();

    const clockIn = fixture.debugElement.query(By.css('select[id="arrival"]'));
    clockIn.nativeElement.click();
    fixture.detectChanges();

    const punchIn = fixture.debugElement.queryAll(By.css('option'))[3];
    punchIn.nativeElement.click();
    fixture.detectChanges();

    const clockOut = fixture.debugElement.query(By.css('select[id="departure"]'));
    clockOut.nativeElement.click();
    fixture.detectChanges();

    const punchOut = fixture.debugElement.queryAll(By.css('option'))[9];
    punchOut.nativeElement.click();
    fixture.detectChanges();

    const result = fixture.debugElement.query(By.css('p'));
    // assert
    expect(result.nativeElement.textContent).toMatch(/You have earned \$88.00 tonight!/);
  })

  it('should properly format a number to a time string with the time manipulation service', () => {
    // arrange
    const time = 17;

    // act
    const timeString = comp.MakePrettyTime(time);

    // assert
    expect(timeString).toBe('5:00PM');
  })

});
