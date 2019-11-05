import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WageCalculatorService } from './services/wage-calculator.service';
import { HourCalculatorService } from './services/hour-calculator.service';
import { TimeManipulationService } from './services/time-manipulation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WageCalculatorService, HourCalculatorService, TimeManipulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
